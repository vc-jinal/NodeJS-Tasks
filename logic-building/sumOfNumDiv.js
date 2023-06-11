//Given an array of numbers, write a function to find the sum of all the numbers that are divisible by 3 or 5.

function sumOfNumDivisibleByFiveOrThree(array) {
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		sum = sum + array[i];
	}
	console.log(sum);
	if (sum % 3 == 0 || sum % 5 === 0) {
		return true;
	} else {
		return false;
	}
}
const array = [1, 2, 3, 4, 5, 5, 2];
const result = sumOfNumDivisibleByFiveOrThree(array);
console.log(result);