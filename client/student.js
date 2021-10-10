
var err_invalid_rollNum = "student roll number is invalid";

// this will load when your page is loaded everytime
window.onload = function() {
    // adding event listener to submit button..
    var buttonSubmit = document.getElementById("button-submit");
    buttonSubmit.addEventListener("click", submitBackFn);

    // adding event listener to get student data button with only rollnum..
    var buttonGetOneStuData = document.getElementById("button-get-student");
    buttonGetOneStuData.addEventListener("click", getStudentDataWithRollNum);

    var buttonGetAllStuData = document.getElementById("button-getall-students");
    buttonGetAllStuData.addEventListener("click", getAllStudentData);
};

// making request to server to update DB with new student info
function submitBackFn() {
    let formData = getStudentFormData();
    if(formData != undefined || formData != null) {
        fetch("http://127.0.0.1:9090/student/", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            return res.json();
        })
        .then((data) => {
            alert(JSON.stringify(data));
        })
        .catch((error) => {
            alert(error);
        });
    }
}

/* getting data from form containing rollnum, name, class, mobile of student */
function getStudentFormData() {
    let name = document.getElementById("input-name").value.trim();
    let rollNum = document.getElementById("input-rollnum").value.trim();
    let classOfStu = document.getElementById("input-class").value.trim();
    let mobileNum = document.getElementById("input-mobile").value.trim();
    let errorMsg = document.getElementById("error-message");

    let isValidName = (name != "") && (/^[a-zA-Z ]*$/.test(name));
    let isValidRollNum = (rollNum != "") && (/^[0-9]+$/.test(rollNum));
    let isValidclassOfStu = (classOfStu != "") && (/^[0-9]+$/.test(classOfStu));
    let isValidmobileNum = (mobileNum != "") && (mobileNum.length == 10) && (/^[0-9]+$/.test(mobileNum));
    if(!isValidName) {
        errorMsg.innerHTML = "student name is invalid";
        errorMsg.style.display = "block";
    } else if(!isValidRollNum) {
        errorMsg.innerHTML = err_invalid_rollNum;
        errorMsg.style.display = "block";
    } else if(!isValidclassOfStu) {
        errorMsg.innerHTML = "student class is invalid";
        errorMsg.style.display = "block";
    } else if(!isValidmobileNum) {
        errorMsg.innerHTML = "student mobile number is invalid";
        errorMsg.style.display = "block";
    } else {
        errorMsg.style.display = "none";
        return {
            "name": name,
            "rollnum": rollNum,
            "class": classOfStu,
            "mobile": mobileNum
        };
    }
}

/* getting student data with only rollnum of student*/
function getStudentDataWithRollNum() {
    // TODO: complete later
    let rollNum = document.getElementById("stu-roll-num").value.trim();
    let errorMsg = document.getElementById("error-rollnum");
    let isValidRollNum = (rollNum != "") && (/^[0-9]+$/.test(rollNum));
    if(!isValidRollNum) {
        errorMsg.innerHTML = err_invalid_rollNum;
        errorMsg.style.display = "block";
    } else {
        console.log("rollnum to get student data: ", rollNum);
        // get request to server to get one student data with query parameter in url of request
        let url = "http://127.0.0.1:9090/student?rollnum=" + rollNum;
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((studData) => {
            let stuArr = studData.data;
            showData(stuArr);
        })
        .catch((error) => {
            alert(error);
        });

        // dummy data to test showData function
        // let stuArr = [
        //     {rollnum: 12, name: "aaa", class: 1, mobile: 1234567890}
        // ];
        // showData(stuArr);
    }
}

/* getting ALL students data */
function getAllStudentData() {
    console.log("Getting all students data");
    // get request
    debugger
    fetch("http://127.0.0.1:9090/student/all")
    .then((res) => {
        return res.json();
    })
    .then((studData) => {
        let stuArr = studData.data;
        showData(stuArr);
    })
    .catch((error) => {
        alert(error);
    });

    // dummy data to test showData function
    // let stuArr = [
    //     {rollnum: 12, name: "aaa", class: 1, mobile: 1234567890},
    //     {rollnum: 13, name: "bbb", class: 2, mobile: 999999999},
    //     {rollnum: 14, name: "ccc", class: 3, mobile: 888888888},
    //     {rollnum: 15, name: "ddd", class: 4, mobile: 777777777},
    // ];
    // showData(stuArr);
}

/* show data in table */
function showData(studentArr) {
    var resultBlock = document.getElementById("result-block");
    var resultTable = document.getElementById("result-table");
    // displaying result block
    resultBlock.style.display = "block";
    // deleting any rows if present
    deleteRows(resultTable);
    // then showing all data

    for(let index = 0; index < studentArr.length; index++) {
        let curStu = studentArr[index];
        let row = resultTable.insertRow(resultTable.length);
        // <th>Rollnum</th><th>Name</th> <th>Class</th> <th>Mobile Num</th>
        let cellRollNum = row.insertCell(0);
        let cellName = row.insertCell(1);
        let cellClass = row.insertCell(2);
        let cellMobile = row.insertCell(3);

        cellRollNum.innerHTML = curStu.rollnum;
        cellName.innerHTML = curStu.name;
        cellClass.innerHTML = curStu.class;
        cellMobile.innerHTML = curStu.mobile;
    }
}

function deleteRows(table) {
    var rowCount = table.rows.length;
    for(let i = rowCount-1; i > 0; i--) {
        table.deleteRow(i);
    }
}
