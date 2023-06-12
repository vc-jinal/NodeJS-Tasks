// Write a function that takes an array of numbers and returns the second smallest number in the array.
function secondSmallestNumber(array) {
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
    return array[1];
}
const array = [0, 4, 8, 9, 3, 65, 2, 2];
const finalArray = secondSmallestNumber(array)
console.log(finalArray);