// 0,2,4,6,8,10
function iteratorFn(arr) {
    let startIndex = 0;
    let endIndex = arr.length;
    let iterObj = {
        nextValue: function () {
            while(startIndex < endIndex) {
                let curValue = arr[startIndex];
                if(curValue % 2 == 0) {
                    let retObj = {"value": curValue, "isValReturned": true};
                    startIndex++;
                    return retObj;
                }
                startIndex++;
            }
            return {"isValReturned": false};
        }
    };
    return iterObj;
};

let arr = [11,12,22,32,41,51,62,71,81,92,1000];
let itrObj = iteratorFn(arr);
let retVal = itrObj.nextValue();

while(retVal.isValReturned) {
    console.log(retVal.value);
    retVal = itrObj.nextValue();
}
console.log("**END**");