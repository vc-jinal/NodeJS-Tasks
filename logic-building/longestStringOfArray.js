// //Write a function that takes an array of strings and returns the longest string in the array.
function longestStringOfArray(array) {
	let finalValue = '';
	for (i = 0; i < array.length; i++) {
		if (array[i].length > finalValue.length) {
			finalValue = array[i];
		}
	}
	return finalValue;
}
const array = ["abcd", "a", "abc", "abc", "ajgbf", "jinal"]
const finalArray = longestStringOfArray(array)
console.log(finalArray);
