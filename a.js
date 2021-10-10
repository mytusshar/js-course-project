
//////////////////////////////////////////////////////////////////////////
// 1. example of getting data from api using https and callBack functions
// const https = require('https');
// const options = {
//    host: 'jsonplaceholder.typicode.com',
//    port: 443,
//    path: '/todos/1'
// };
 
// function getData() {
//     https.get(options, (res) => {
//         console.log('statusCode2:', res.statusCode);
//         res.on('data', (data) => {
//             console.log("data: ", data);
//         });
//     })
//     .on('error', (e) => {
//         console.error(e);
//     });
// };
// getData();
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// 2. above example (ex.1) is converted to promise
// const https = require('https');
// const options = {
//    host: 'jsonplaceholder.typicode.com',
//    port: 443,
//    path: '/todos/1'
// };
// new Promise((resolve, reject) => {
//    https
//    .get(options, resolve) // 1. getting only response and not data..
//    .on('error', reject);
// }).then((resp) => {
//    // 2. we got the response here containing headers and other info of data (and not actual data)
//    return new Promise((resolve, reject) => {
//        resp.on('data', resolve); // 3. making call to get data
//    })
// }).then((data) => {
//    return JSON.parse(data); // 4. got the data here in buffer and parsing it to JSON
// }).then((jsonData) => {
//    console.log("jsonData: ", jsonData); // 5. here we will receive JSON data
// }).catch((error) => {
//    // if any error occurs in above 5 steps, then it will come here..
//    console.log("error: ", error);
// })
//////////////////////////////////////////////////////////////////////////

// fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
// .then((resp) => {
//     return resp.json();
// }).then((jsonData) => {
//     console.log("jsonData: ", jsonData);
// }).catch((error) => {
//     // if any error occurs in above 5 steps, then it will come here..
//     console.log("error: ", error);
// })
//////////////////////////////////////////////////////////////////////////

// const https = require('https');
// const options = {
//    host: 'jsonplaceholder.typicode.com',
//    port: 443,
//    path: '/todos/1'
// };
// debugger
// async function f() {
//     var promiseObj = new Promise((resolve, reject) => {
//        https
//        .get(options, resolve)
//        .on('error', reject);
//     });
    
//     console.log("Getting data1");
//     let res = await promiseObj;
//     console.log("Got data2");
//     console.log("Got data3");
// };

// async function a() {
//     await f();
//     console.log("After f cn call.");
// }
// a();
//////////////////////////////////////////////////////////////////////////
// above example (ex.1) is converted to async await
// const https = require('https');
// debugger
// async function a() {
//     console.log("Before premises");
//     var pr1 = await new Promise((resolve, reject) => {
//         var options = {
//             host: 'jsonplaceholder.typicode.com',
//             port: 443,
//             path: '/todos/1'
//         }
//         https.get(options, resolve).on('error', reject);
//     });
//     console.log("Pr1: ", pr1);
//     var pr2 = await new Promise((resolve, reject) => {
//         var options = {
//             host: 'api.github.com',
//             port: 443,
//             path: 'repos/javascript-tutorial/en.javascript.info/commits'
//         }
//         // https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits
//         https.get(options, resolve).on('error', reject);
//     });
//     console.log("Pr2: ", pr2);
//     var pr3 = await new Promise((resolve, reject) => {
//         var options = {
//             host: 'reqres.in',
//             port: 443,
//             path: 'api/users/2'
//         }
//         // https://reqres.in/api/users/2
//         https.get(options, resolve).on('error', reject);
//     });
//     console.log("Pr3: ", pr3);
// };
// a();
//////////////////////////////////////////////////////////////////////////
// callbacks
// promise
// async-await
// generators/iterators
 