var database = require("./database.js");
var express = require("express");
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// default path
// http://127.0.0.1:9090/
app.get("/", function(req, res) {
    res.json({"status": "server is ready"});
});

// http://127.0.0.1:9090/student/all
app.get("/student/all", function(req, res) {
    var onGetData = function(studentArr) {
        res.json({"data": studentArr});
    };
    database.getStudentData(null, onGetData);
});

/* get request using query parameter */
// http://127.0.0.1:9090/student?rollnum=12
app.get("/student", function(req, res) {
    let rollnum = req.query.rollnum;
    var onGetData = function(studentArr) {
        res.json({"data": studentArr});
    };
    database.getStudentData(rollnum, onGetData);
});

// http://127.0.0.1:9090/student
app.post("/student", function(req, res) {
    let student = req.body;
    var onDataInserted = (cbObj) => {
        if(cbObj.returnVal) {
            res.send({"status": "student added to the database"});
        } else {
            res.send({"status": cbObj.error});
        }
    };
    database.insertData(student, onDataInserted);
});


// server creation logic
app.set("port", "9090");

var serverBackFn = () => {
    console.log("Server is listening on port: " + server.address().port);
    // when server is created, create DB also
    database.createDBCifNotPresent();
}
var server = app.listen(app.get("port"), serverBackFn);