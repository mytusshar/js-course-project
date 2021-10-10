// 0,2,4,6,8,10
function* iteratorFn() {
    let startValue = 0;
    let endMaxValue = 10;
    let step = 2;
    while(startValue <= endMaxValue) {
        let retObj = startValue;
        startValue += step;
        yield retObj;
    }
};

let itrObj = iteratorFn();
let retVal = itrObj.next();

while(!retVal.done) {
    console.log(retVal.value);
    retVal = itrObj.next();
}
console.log("**END**");