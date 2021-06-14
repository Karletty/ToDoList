const daysName = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekText = document.querySelector(".calendar-week");
const monthYearText = document.querySelector(".month-year");
const daysText = document.querySelector(".calendar-days");
const prevMonthBtn = document.querySelector(".calendar-prev");
const nextMonthBtn = document.querySelector(".calendar-next");
let actualDate = new Date();
let actualDay = actualDate.getDay();
let actualMonth = actualDate.getMonth();
let actualYear = actualDate.getFullYear();
let monthDays;
setNewDate();
writeDayName();
writeMonth();

function writeDayName() {
    for (let i = 0; i < daysName.length; i++) {
        weekText.innerHTML += `<h4 class="calendar-item">${daysName[i]}</h4>`;
    }
}

function makeDateSelect(){
    for (let i = 0; i < monthDays.length; i++) {
        monthDays[i].addEventListener('click',() =>{
            let position = i;
            monthSelect = selector(position, monthDays, monthSelect);
        });    
    }
}

function writeMonth() {
    let nextYear;
    let nextMonth = actualMonth + 1;
    daysText.innerHTML = ``;
    for (let i = setStartDay(actualMonth); i > 0; i--) {
        daysText.innerHTML += `<div class="calendar-item calendar-day other-days">${(getTotalDays(actualMonth - 1)) - (i - 1)}</div>`;
    }
    for (let i = 0; i < getTotalDays(actualMonth); i++) {
        daysText.innerHTML += `<div class="calendar-item calendar-day month-days">${(i + 1)}</div>`;
    }
    if (nextMonth > 11) {
        nextMonth = 0;
        nextYear = actualYear + 1;
    }
    else {
        nextYear = actualYear;
    }
    for (let i = 0; i < (6 - setEndDay(actualYear, actualMonth)); i++) {
        daysText.innerHTML += `<div class="calendar-item calendar-day other-days">${(i + 1)}</div>`;
    }
    monthDays = document.getElementsByClassName("month-days");
    makeDateSelect();
}

function getTotalDays(month) {
    if (month === -1) {
        month = 11;
    }
    let haveThirtyOneDays = false;
    let monthsThirtyOneDays = [0, 2, 4, 6, 7, 8, 11];
    if (month === 1) {
        return checkLeap() ? 29 : 28;
    }
    for (let i = 0; i < monthsThirtyOneDays.length; i++) {
        if (month === monthsThirtyOneDays[i]) {
            haveThirtyOneDays = haveThirtyOneDays || true;
        } else {
            haveThirtyOneDays = haveThirtyOneDays || false;
        }
    }
    if (haveThirtyOneDays) {
        return 31;
    }
    else {
        return 30;
    }
}

function lastMonth() {
    if (actualMonth !== 0) {
        actualMonth--;
    }
    else {
        actualMonth = 11;
        actualYear--;
    }
    setNewDate();
}

function nextMonth() {
    if (actualMonth !== 11) {
        actualMonth++;
    }
    else {
        console.log("Aumento un año")
        actualMonth = 0;
        actualYear++;
    }
    setNewDate();
}

function setNewDate() {
    if (actualMonth == actualDate.getMonth() && actualYear == actualDate.getFullYear()) {
        prevMonthBtn.classList.add("hide");
    }
    monthYearText.innerText = `${months[actualMonth]} ${actualYear}`;
    writeMonth(actualMonth);
}

function checkLeap() {
    let isLeap = (actualYear % 4) === 0;
    return (isLeap);
}

function setStartDay(month) {
    let startDay = new Date(actualYear, month, 1);
    startDay = startDay.getDay() - 1;
    startDay = (startDay === -1) ? 6 : startDay;
    return startDay;
}
function setEndDay(year, month) {
    let endDay = new Date(year, month, getTotalDays(month));
    endDay = endDay.getDay() - 1;
    endDay = (endDay === -1) ? 6 : endDay;
    return endDay
}


prevMonthBtn.addEventListener("click", () => {
    lastMonth();
})
nextMonthBtn.addEventListener("click", () => {
    prevMonthBtn.classList.remove("hide");
    nextMonth();
})