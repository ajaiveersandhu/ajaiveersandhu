// Define UI varibales
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector("#filter");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load Event
    document.addEventListener("DOMContentLoaded", getTasks);
    // Add task event
    form.addEventListener("submit", addTask);
    // Remove task event
    taskList.addEventListener("click", removeTask);
    // Clear task event
    clearBtn.addEventListener("click", clearTasks);
    // Filter tasks
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from local storage
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task) => {
        // Create li element
        const li = document.createElement("li");

        // Add Class
        li.className = "collection-item";

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement("a");

        // Add Class
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        // Append link to list item
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(event) {
    if (taskInput.value === "") {
        M.toast({
            html: `Write some task, first !!!`,
            classes: "rounded",
            displayLength: 750
        });
    } else {
        // Create li element
        const li = document.createElement("li");

        // Add Class
        li.className = "collection-item";
        
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        // Create new link element
        const link = document.createElement("a");

        // Add Class
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        // Append link to list item
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);

        // Store task in local storage
        storeTaskInLocalStorage(taskInput.value);

        // Clear Input
        taskInput.value = "";
    }

    event.preventDefault();
}


// Remove Task
function removeTask(event) {
    if (event.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure ?")) {
            event.target.parentElement.parentElement.remove();

            // Remove task from local storage
            removeFromLocalStorage(event.target.parentElement.parentElement);
        }
    }
}

function removeFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Clear tasks from local storage
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    document.querySelectorAll("li.collection-item").forEach((task) => {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}