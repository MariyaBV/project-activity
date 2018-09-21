function searchOlder(staffs){
    const obj = Object.keys(staffs);
    if (obj.length == 0) return null;

    let maxKey = obj[0];
    let maxValue = staffs[maxKey];

    for (const key of obj)
    if (staffs[key] > maxValue) {
        maxValue = staffs[key];
        maxKey = key;
    };

    return  ({
        name: maxKey,
        age: maxValue
    })
}

function main() {
    const staff = {
        "Вася": -23,
        "Петя": -27,
        "Даша": -22,
    };
    const olderStaff = searchOlder(staff);
    console.log(olderStaff);
}

main();    