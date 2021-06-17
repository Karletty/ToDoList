const filter = document.getElementById("filter");
let taskHour = [];
let taskDate = [];
let taskDateValue = [];
let taskPriority = [];
let allTask = [];
let filterValue;
let clickedTimes = 0;
filter.addEventListener("click", () => {
    clickedTimes += 1;
    if (clickedTimes === 2) {
        clickedTimes = 0;
        filterValue = filter.value;
        allTask = document.getElementsByClassName("task");
        if (allTask.length < 2) {
            error[5].innerText = "You must have at least 2 task to filter";
        }
        else {
            error[5].innerText = "";
            declareTasks();
            filterValues();
        }
    }
});
function filterValues() {
    let positions = [];
    let taskValue= getTotalDate();
    for (let i = 0; i < allTask.length; i++) {
        positions[i]=i;
    }
    positions = sortValues(taskValue, positions);
    showTasksByOrder(positions);
    let priorityArray = getPriority();
    if (filterValue === "high" || filterValue === "medium" || filterValue === "low") {
        let priority;
        switch (filterValue) {
            case "value":
                case "low":
                    priority = 3;
                    break;
                case "medium":
                    priority = 2;        
                    break;
                case "high":
                    priority = 1;        
                    break;
                default:
                    break;
        }
        showOnlyPriority(priority, priorityArray);
    }
    else {
        for (let i = 0; i < allTask.length; i++) {
            allTask[i].classList.remove("hide");
        }
        if (filterValue !== "date") {
            let newPositions = [];
            for (let j = 0; j < allTask.length; j++) {
                newPositions[j] = j
            }
            newPositions = sortValues(priorityArray,newPositions);
            if (filterValue !== "highToLow") {
                newPositions = newPositions.reverse();
            }
            showTasksByOrder(newPositions);
        }
    }
}
function showTasksByOrder(order){
    let aux = [];
    for (let i = 0; i < allTask.length; i++) {
        aux[i] = allTask[i].innerHTML;    
    }
    for (let j = 0; j < allTask.length; j++) {
        allTask[j].innerHTML = aux[order[j]];    
    }
}
function declareTasks() {
    for (let i = 0; i < allTask.length; i++) {
        taskHour[i] = allTask[i].querySelector(".hour").innerText;
        taskDate[i] = allTask[i].querySelector(".date").innerText;
        taskPriority[i] = allTask[i].querySelector(".priority");
        taskPriority[i] = taskPriority[i].innerText;
    }
}
function getPriority(){
    const tasksPriority = taskContainer.getElementsByClassName("task-time");
    let priorities = []
    for (let i = 0; i < allTask.length; i++) {
        allTask[i].classList.remove("hide");
        let classes = tasksPriority[i].classList;
        for (let j = 0; j < classes.length; j++) {
            let className = classes[j]
            switch (className) {
                case "low":
                    priorities[i] = 3;
                    break;
                case "medium":
                    priorities[i] = 2;        
                    break;
                case "high":
                    priorities[i] = 1;        
                    break;
                default:
                    break;
            }
        }
    }
    return priorities;
}
function showOnlyPriority(priority, prioritiesArray) {
    for (let j = 0; j < allTask.length; j++) {
        allTask[j].classList.remove("hide");
    }
    for (let i = 0; i < allTask.length; i++) {
        if (prioritiesArray[i] !== priority) {
            allTask[i].classList.add("hide")
        }    
    }
}
function getTotalMinutes() {
    for (let i = 0; i < taskHour.length; i++) {
        totalMinutes = taskHour;
        totalMinutes[i] = totalMinutes[i].replace(":", "");
        let hours = Number(totalMinutes[i].substring(0, 2));
        let minutes = Number(totalMinutes[i].substring(2, 5));
        totalMinutes[i] = (hours * 60) + minutes;
    }
}
function getPriorityPositions(priority){

}
function getTotalDate() {
    let taskValue = [];
    for (let i = 0; i < allTask.length; i++) {
        let year, month, day, hour, minutes,aux;
        aux = taskDate[i];
        aux = aux.split("/");
        aux2 = taskHour[i]
        aux2 = aux2.replace(":","");
        year = Number(aux[2]);
        month = Number(aux[0]);
        day = Number(aux[1]);
        hour = Number(aux2.substring(0, 2));
        minutes = Number(aux2.substring(2,5));
        taskValue[i] = minutes + (100 * hour) + (10000 * day) + (1000000 * month) + (100000000 * year);
    }
    return taskValue;
}
function sortValues(arrayToOrder, arrayPositions) {
    let n = arrayToOrder.length;
    let aux,aux2;
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < (n - i); j++) {
            if (arrayToOrder[j] > arrayToOrder[j + 1]) {
                aux = arrayToOrder[j];
                arrayToOrder[j] = arrayToOrder[j + 1];
                arrayToOrder[j + 1] = aux;
                aux2 = arrayPositions[j];
                arrayPositions[j] = arrayPositions[j + 1];
                arrayPositions[j + 1] = aux2;
            }
        }
    }
    return arrayPositions;
}