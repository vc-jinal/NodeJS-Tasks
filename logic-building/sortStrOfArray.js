//Given an array of strings, write a function to sort the strings based on their length, 
// from shortest to longest.
function sortStringOfArray(array) {
    for (let i = 0; i < array.length; i++) {
        let temp = 0;
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j]) {
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}
const array = ["abc", "a", "ab", "abcde", "a", "abcsder"];
const result = sortStringOfArray(array);
console.log("After Sorting string: ", result);
