//Write a function that takes a string as input and returns the characters in the string in alphabetical order.
function alphabeticalOrder(str) {
	const string = str.split("");
	console.log("given string: ", str);
	for (let i = 0; i < string.length; i++) {
		let temp = 0;
		for (let j = i + 1; j < string.length; j++) {
			if (string[i] > string[j]) {
				temp = string[i];
				string[i] = string[j];
				string[j] = temp;
			}
		}
	}
	//console.log("final op",string)
	return string.join("");
}
const string = "cba";
const result = alphabeticalOrder(string);
console.log("After Sorting string: ", result);
