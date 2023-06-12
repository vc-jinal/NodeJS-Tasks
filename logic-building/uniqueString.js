//Write a function that takes an array of strings and returns a new array with only the unique strings 
//(removing duplicates).
function uniqueString(array) {
    let uniqueStr = [];
    for (let i = 0; i < array.length; i++) {
        let isUnique = true;
        for (let j = 0; j < uniqueStr.length; j++) {
            if (array[i] === uniqueStr[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique) {
            uniqueStr.push(array[i]);
        }
    }
    return uniqueStr;
}
const array = ["abc", "abc", "xyz", "yyy", "def", "def", "jinal", "jinny", "jinny"];
const result = uniqueString(array);
console.log(result);



