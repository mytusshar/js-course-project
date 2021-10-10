var mysql = require("mysql");
var constant = require("./constants.js");

// establishing connection with database
var createConnection = function() {
    let conn = mysql.createConnection({
        host: constant.DB_HOST,
        user: constant.DB_USER_NAME,
        password: constant.DB_PASSWORD
    });
    return conn;
};

var dbOperations = function(sqlQuery) {
    var conn = createConnection();
    var asyncSQLFn = function(resolve, reject) {
        // connecting with database
        conn.connect((error) => {
            if(error) {
                console.log("Error::::: error while establishing connection with DB");
                console.log(error);
                reject(error);
            }
            console.log("Log::::: Establishedconnection with DB");

            // making sql queries to database
            conn.query(sqlQuery, (error, result) => {
                if(error) {
                    console.log("Error::::: error while querying DB");
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Log::::: DB query SUCCESS");
                    resolve(result);
                }
            });
            // ending connection
            conn.end();
        });
    };
    return new Promise(asyncSQLFn);
};

// code: create, data("database")
// code: create, data("table")
// code: insert, data(student data)
// code: select, data(rollnum)
// code: select, data(null)
var generateQuery = function(code, data) {
    // creating table if its not present..
    // insert: for storing student data
    // select: for getting data using rollnum 
    // select: for getting all students data..
    let dataBase = constant.DB_NAME;
    let table = dataBase + "." + constant.TABLE_NAME;
    let query;

    switch(code) {
        case constant.CREATE_DB: // create db
            query = "CREATE DATABASE " + dataBase;
            break;
        case constant.CREATE_TABLE: // create table
            query = "CREATE TABLE " + table + " (rollnum int, name varchar(255), class int, mobile varchar(255) )";
            break;
        case constant.INSERT:
            query = "INSERT INTO " + table + " (rollnum, name, class, mobile) VALUES "
                + " ( '" + data.rollnum + "', '" + data.name + "', '" + data.class + "', '" + data.mobile +"')";
            break;
        case constant.SELECT_ALL: // get all student data
            query = "SELECT * FROM " + table;
            break;
        case constant.SELECT_FOR_ROLLNUM: // its rollnum, get student data of provided rollnum
            query = "SELECT * FROM " + table + " WHERE rollnum='" + data.rollnum + "'";
            break;
        default:
            throw Error("Invalid Query code: " + code);
    }
    return query;
};

exports.getStudentData = function(rollNUM, callBack) {
    let query = generateQuery(constant.SELECT_ALL);
    if(rollNUM != undefined && rollNUM != null) {
        let data = {rollnum: rollNUM}
        query = generateQuery(constant.SELECT_FOR_ROLLNUM, data);
    }

    let prObj = dbOperations(query);
    prObj.then((studResp) => {
        console.log("Log::::: Got student data");
        // studResp is arr
        let studArr = [];
        for(let i = 0; i < studResp.length; i++) {
            let stu = {
                "name": studResp[i].name,
                "rollnum": studResp[i].rollnum,
                "mobile": studResp[i].mobile,
                "class": studResp[i].class,
            };
            studArr.push(stu);
        }
        callBack(studArr);
    })
    .catch((error) => {
        console.log("Error::::: error while getting student data=> ", error);
        callBack({returnVal: false, error: error});
    });
};

exports.insertData = function(stuData, callBack) {
    let query = generateQuery(constant.INSERT, stuData);
    let prObj = dbOperations(query);
    prObj.then((resp) => {
        console.log("Log::::: Data inserted successfully");
        callBack({returnVal: true});
    })
    .catch((error) => {
        console.log("Error::::: error while inserting data=> ", error);
        callBack({returnVal: false, error: error});
    });
};

var createTableIfNotPresent = () => {
    let query = generateQuery(constant.CREATE_TABLE);
    let prObj = dbOperations(query);
    prObj.then((resp) => {
        console.log("Log::::: Table created successfully");
    })
    .catch((error) => {
        console.log("Error::::: error while creating Table=> ", error);
    });
};

exports.createDBCifNotPresent = function() {
    let query = generateQuery(constant.CREATE_DB);
    let prObj = dbOperations(query);
    prObj.then((resp) => {
        console.log("Log::::: DB created successfully");
        // creating table
        createTableIfNotPresent();
    })
    .catch((error) => {
        console.log("Error::::: error while creating DB=> ", error);
    });
};