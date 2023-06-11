// //Write a function that takes an array of strings and returns the longest string in the array.
function longestStringOfArray(arr) {
	let finalValue = '';
	for (i = 0; i < arr.length; i++) {
		if (arr[i].length > finalValue.length) {
			finalValue = arr[i];
		}
	}
	return finalValue;
}
const array = ["abcd", "a", "abc", "abc", "ajgbf", "jinal"]
const finalArray = longestStringOfArray(array)
console.log(finalArray);
