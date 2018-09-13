const staff = {
        "Вася": -23,
        "Петя": -27,
        "Даша": -22
};

let maxValue = Object.values(staff)[0];
let maxValueKey = Object.keys(staff)[0];
for (const key of Object.keys(staff)){
    if( staff[key] > maxValue) {
        maxValue = staff[key];
        maxValueKey = key;
    }
}
console.log(maxValue);
console.log(maxValueKey);