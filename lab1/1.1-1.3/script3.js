const staff = {
    "Вася": 23,
    "Петя": 27,
    "Даша": 22
};

function searchMax(objIterable){
    let trFl = isEmpty(objIterable);

    let maxValue = Object.values(objIterable)[0];
    let maxValueKey = Object.keys(objIterable)[0];

    if (trFl) 
    {
        for (const key of Object.keys(objIterable))
        if (objIterable[key] > maxValue) {
            maxValue = objIterable[key];
            maxValueKey = key;
        };
        return  console.log( {
            name: maxValueKey,
            age: maxValue
        })
    } else {
        console.log("Объект пустой");
    }   
}

function isEmpty(obj) {
    for (const key in obj)
        if (obj.hasOwnProperty(key)) return true;
    return false;
}

searchMax(staff);    