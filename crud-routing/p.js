t1 = [1, 2, 3, 2, 3];
t2 = [1, 2, 3, 0];

//intersaction
const common = t1.filter(n => t2.includes(n));
console.log("Common values :", common);

//different
let difference = t1.filter(x => !t2.includes(x))
    .concat(t2.filter(x => !t1.includes(x)));
console.log("different : ", difference);

//t1 records which is not contain common value and t2
const team1 = t1.filter(n => !t2.includes(n));
console.log(team1);
//t2 records which is not contain common value and t1 
const team2 = t2.filter(n => !t1.includes(n));
console.log(team2);