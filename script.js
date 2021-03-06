const error = document.getElementsByClassName("error");
const screens = document.getElementsByClassName("screen");
const navItems = document.getElementsByClassName("nav-item");
const priorityBtns = document.getElementsByClassName("priority-btn");
const taskName = document.querySelector(".task-name");
const taskTime = document.querySelector(".task-time");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskContainer = document.querySelector(".tasks-container");
const taskDescription = document.querySelector(".task-description");
const calendarDropdown = document.querySelector(".calendar-dropdown");
const calendarInfo = document.querySelector(".calendar-info");
const calendarItems = document.querySelector(".calendar-items");
const priorityText = ["Low", "Medium", "High"];
let dropdownClick;
let monthSelect = [];
let prioritySelect = [];

calendarDropdown.addEventListener("click",() => {
    dropdownClick = !dropdownClick;
    if (dropdownClick) {
        calendarInfo.classList.add("flex");
        calendarItems.classList.add("block");
    }
    else {
        calendarInfo.classList.remove("flex");
        calendarItems.classList.remove("block");
    }
});

class Task {
    constructor(name, time, priority, description, date) {
        this.name = name;
        this.time = time;
        this.priority = priority;
        this.description = description;
        this.date = date;
    }
}
function addTask({ name, time, priority, description, date }) {
    taskContainer.innerHTML +=
        `<div class="task">
        <div class="task-time ${priority.toLowerCase()}">
            <div class="date-container">
                <p class="hour">${time}</p>
                <p class="date">${date}</p>
            </div>
            <p class="priority">${priority}</p>
        </div>
        <div class="task-info center">
            <p class="task-title">${name}</p>
            <hr class="paragraph-break"/>
            <p>${description}</p>
        </div>
    </div>`;
}
const changeScreens = position => {
    for (let i = 0; i < screens.length; i++) {
        screens[position].classList.remove("hide");
        if (i !== position) {
            screens[i].classList.add("hide");
        }
        if(position === 1){
            error[5].innerText = "";
        }
    }
}
function makeDateSelect() {
    for (let i = 0; i < monthDays.length; i++) {
        monthDays[i].addEventListener('click', () => {
            let position = i;
            monthSelect = selector(position, monthDays, monthSelect);
        });
    }
}
for (let j = 0; j < priorityBtns.length; j++) {
    priorityBtns[j].addEventListener('click', () => {
        let position = j;
        prioritySelect = selector(position, priorityBtns, prioritySelect);
    });
}
function selector(position, array, selectArray) {
    selectArray[position] = !selectArray[position];
    if (selectArray[position]) {
        for (let i = 0; i < array.length; i++) {
            if (i === position) {
                array[i].classList.add("selected");
            }
            else {
                array[i].classList.remove("selected");
                selectArray[i] = false;
            }
        }
    }
    else {
        array[position].classList.remove("selected");
    }
    return selectArray;
}
for (let k = 0; k < navItems.length; k++) {
    navItems[k].addEventListener("click", () => {
        let actualScreen = k;
        changeScreens(actualScreen);
    });
}


function validate(data) {
    let isComplete = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i]) {
            isComplete[i] = true;
        }
        else {
            isComplete[i] = false;
        }
    }
    return validateAll(isComplete);
}
function validateHour(completeHour) {
    let date = new Date();
    if (getSelected(monthDays)) {
        if (getSelected(monthDays).getDate() === date.getDate() && getSelected(monthDays).getMonth() === date.getMonth()) {
            completeHour = completeHour.replace(":", "");
            let hourSelected = Number(completeHour.substring(0, 2));
            let minutesSelected = Number(completeHour.substring(2, 5));
            let actualHour = date.getHours();
            let actualMinutes = date.getMinutes();
            if (hourSelected < actualHour || (minutesSelected < actualMinutes && hourSelected === actualHour)) {
                error[1].innerText = "You cannot select a time that has already passed";
                return false;
            }
        }
    }
    return true;
}
function validateDate(selectedDate) {
    if (selectedDate.getDate() < actualDate.getDate() && selectedDate.getMonth() === actualDate.getMonth()) {
        error[4].innerText = "You cannot select a date that has already passed";
        return false;
    }
    return true;
}
function validateAll(completeArray) {
    let isValidate = true;
    for (let i = 0; i < completeArray.length; i++) {
        if (!completeArray[i]) {
            error[i].innerText = "You must complete this to add a task";
            isValidate = isValidate && false;
        }
        else {
            error[i].innerText = ""
            if (i === 1) {
                isValidate = isValidate && validateHour(taskTime.value);
            }
            if (i === 4) {
                isValidate = isValidate && validateDate(getSelected(monthDays));
            }
        }
    }
    return isValidate;
}
function getSelected(array) {
    let position;
    let text
    for (let i = 0; i < array.length; i++) {
        position = i;
        let classes = array[i].classList;
        for (let j = 0; j < classes.length; j++) {
            if (classes[j] === "selected") {
                isSelected = true;
                if (array.length < 4) {
                    text = getPriorityText([position]);
                }
                else {
                    position = i + 1;
                    text = new Date(actualYear, actualMonth, position);
                }
            }
        }
    }
    return text;
}
function getDateText() {
    let selectedDate = getSelected(monthDays);
    textDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
    return textDate;
}
function getPriorityText(position) {
    textBtn = priorityText[position];
    return textBtn;
}
function clearTaskCreator() {
    taskTime.value = null;
    taskName.value = null;
    taskDescription.value = null;
    for (let i = 0; i < priorityBtns.length; i++) {
        priorityBtns[i].classList.remove("selected");
    }
    for (let j = 0; j < monthDays.length; j++) {
        monthDays[j].classList.remove("selected");
    }
}
addTaskBtn.addEventListener("click", () => {
    if (validate([taskName.value, taskTime.value, getSelected(priorityBtns), taskDescription.value, getSelected(monthDays)])) {
        const task = new Task(
            taskName.value,
            taskTime.value,
            getSelected(priorityBtns),
            taskDescription.value,
            getDateText()
        );
        addTask(task);
        clearTaskCreator();
    }
});
changeScreens(0);