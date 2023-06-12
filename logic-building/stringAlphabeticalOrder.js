//Write a function that takes a string as input and returns the characters in the string in alphabetical order.
function alphabeticalOrder(str) {
	const string = str.split("");
	console.log("given string: ", str);
	for (let i = 0; i < string.length; i++) {
		let temp = 0;
		for (let j = i + 1; j < string.length; j++) {
			if (string[i].toLowerCase() > string[j].toLowerCase()) {
				temp = string[i];
				string[i] = string[j];
				string[j] = temp;
			}
		}
	}
	return string.join("");
}
const string = "JinNAl";
const result = alphabeticalOrder(string);
console.log("After Sorting string: ", result);