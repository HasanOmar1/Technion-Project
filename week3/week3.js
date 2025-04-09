// True Or False
// https://lofty-page-4ab.notion.site/True-or-False-1cc6c24c99bf8190af47fc396d43cb38

// ********************************************************
// Q1

// if ("0") alert("Hello");
// Yes the alert will be activated because a string is always true

// ********************************************************
// Q2

// const question = prompt(`Whats the official name of JS?`);

// if (question.toLowerCase() === "ecmascript") alert("You are Correct!");
// else alert(`False! The official name of JS is ECMAScript`);

// ********************************************************
// Q3

// let score = 75;
// let grade;

// if (score >= 90) {
//   grade = "A";
// } else if (score >= 80) {
//   grade = "B";
// } else if (score >= 70) {
//   grade = "C";
// } else if (score >= 60) {
//   grade = "D";
// } else {
//   grade = "F";
// }

// const answer = score >= 90 ? "A" : score >= 80 ? "B" : score >= 60 ? "D" : "F";
// console.log("הציון הוא:", answer);

// ********************************************************
// Q4

// let num = prompt("Enter num");

// if (num > 0) alert(`1 <<< (${num} is bigger than 0)`);
// else if (num < 0) alert(`-1  <<< (${num} is smaller than 0)`);
// else alert(`0 <<< (${num} is equal to 0)`);

// ********************************************************
// EXTRA

// const infoArray = [
//   "יום ראשון - חזרה לשגרה",
//   "יום שני - ישיבת צוות",
//   "יום שלישי - עבודה על פרויקט",
//   "יום רביעי - ספורט בערב",
//   "יום חמישי - סיום משימות",
//   "יום שישי - קניות לשבת",
//   "שבת - מנוחה",
// ];

// let day = prompt("Enter day of week");
// switch (day.toLowerCase()) {
//   case "1":
//   case "sunday":
//   case "ראשון":
//     alert(infoArray[0]);
//     break;
//   case "2":
//   case "monday":
//   case "שני":
//     alert(infoArray[1]);
//     break;
//   case "3":
//   case "tuesday":
//   case "שלישי":
//     alert(infoArray[2]);
//     break;
//   case "4":
//   case "wednesday":
//   case "רביעי":
//     alert(infoArray[3]);
//     break;
//   case "5":
//   case "thursday":
//   case "חמישי":
//     alert(infoArray[4]);
//     break;
//   case "6":
//   case "friday":
//   case "שישי":
//     alert(infoArray[5]);
//     break;
//   case "7":
//   case "saturday":
//   case "שבת":
//     alert(infoArray[6]);
//     break;
//   default:
//     alert(`WRONG ANSWER!`);
// }

// ********************************************************
// Q5

// let result;

// if (a + b < 4) {
//    result = 'Not enough';
// } else {
//    result = 'A lot';
// }

// let a = prompt("Enter a");
// let b = prompt("Enter b");

// let sum = Number(a) + Number(b);
// let result = sum < 4 ? "Not enough" : "A lot";
// alert(`${a} + ${b} = ${sum} so its ${result}`);

// ********************************************************
// Q6

// let message;

// if (login == "Employee") {
//   message = "Hello";
// } else if (login == "Director") {
//   message = "Hello";
// } else if (login == "") {
//   message = "No login";
// } else {
//   message = "";
// }

// let login = prompt("Enter your role");
// let message =
//   login === "Employee" || login === "Director"
//     ? "Hello"
//     : login === ""
//     ? "No login"
//     : "";
// alert(message);

// ********************************************************
// Q7

// console.log(false || "sdf"); // "sdf"
// console.log(false && ""); // false
// console.log(true || ""); // true
// console.log(true && ""); // ""
// console.log(undefined || null); // null
// console.log(undefined || 0 || null); // null
// console.log(undefined && 0 && null); // undefined
// console.log(1 || 0); // 1
// console.log(null || 1); // 1
// console.log(null || 0 || 1); // 1

// ********************************************************
// ********************************************************

// Loops
// https://lofty-page-4ab.notion.site/Loops-1cc6c24c99bf813c967ee35c6bbe1c9a

// ********************************************************
// Q1
