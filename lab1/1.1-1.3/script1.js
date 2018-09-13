function getWeek(dayWeekNumber){
    let dayOfWeek;
    switch(dayWeekNumber) {
        case 0: dayOfWeek = "Воскресенье";
        break;
        case 1: dayOfWeek = "Понедельник";
        break;
        case 2: dayOfWeek = "Вторник";
        break;
        case 3: dayOfWeek = "Среда";
        break;
        case 4: dayOfWeek = "Четверг";
        break;
        case 5: dayOfWeek = "Пятница";
        break;
        case 6: dayOfWeek = "Суббота";
        break;
  }
  return dayOfWeek;
}

function returnDayWeek(getOfWeek){
    alert(getOfWeek);
}

const dayWeekNumber = new Date().getDay();
const getOfWeek = getWeek(dayWeekNumber);
returnDayWeek(getOfWeek);