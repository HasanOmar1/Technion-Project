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

// let num = prompt("Enter num");

// if (num > 0) alert(`${num} is bigger than 0`);
// else if (num < 0) alert(`${num} is smaller than 0`);
// else alert(`${num} is equal 0`);

// ******************************************

const infoArray = [
  "יום ראשון - חזרה לשגרה",
  "יום שני - ישיבת צוות",
  "יום שלישי - עבודה על פרויקט",
  "יום רביעי - ספורט בערב",
  "יום חמישי - סיום משימות",
  "יום שישי - קניות לשבת",
  "שבת - מנוחה",
];

let day = prompt("Enter day of week");
switch (day.toLowerCase()) {
  case "1":
  case "sunday":
  case "ראשון":
    alert(infoArray[0]);
    break;
  case "2":
  case "monday":
  case "שני":
    alert(infoArray[1]);
    break;
  case "3":
  case "tuesday":
  case "שלישי":
    alert(infoArray[2]);
    break;
  case "4":
  case "wednesday":
  case "רביעי":
    alert(infoArray[3]);
    break;
  case "5":
  case "thursday":
  case "חמישי":
    alert(infoArray[4]);
    break;
  case "6":
  case "friday":
  case "שישי":
    alert(infoArray[5]);
    break;
  case "7":
  case "saturday":
  case "שבת":
    alert(infoArray[6]);
    break;
  default:
    alert(`WRONG ANSWER!`);
}
