//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const totalTask = document.getElementById("task");
const currentDate = document.getElementById("date");
const currentTime = document.getElementById("time");

todos = JSON.parse(localStorage.getItem('todos'));
let CountArr = [];
if(todos!==null){
     CountArr = [...todos];
}

//Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo)

window.onload = getTodos();  // Invoking getTodo function when page is loaded
window.onload = displayTime(); // Invoking displayTime function when page is loaded

//Functions
function addTodo(event) {
    event.preventDefault();   // Prevent form from submitting
    if (todoInput.value.trim().length === 0) {
        alert("Please enter your task");
    }
    else {
        //Create Todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Completed checkbox
        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.classList.add("completed-checkbox");
        todoDiv.appendChild(completedCheckbox);

        //Create todo list
        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // ADD Todo to local storage
        saveLocalTodos(todoInput.value);

        //Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //attach final Todo
        todoList.appendChild(todoDiv);
        // Clear todo input value
        todoInput.value = "";
        CountArr.push(todoInput.value);
        showTotalTask();
    }
}


function deleteTodo(event) {
    const item = event.target;
    //Delete todo
    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("delete-animation");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {   //waiting for animation to end and then delete it
        todo.remove();
        })
        CountArr.pop();
        showTotalTask();
    }
    // Checked todo
    if (item.classList[0] === "completed-checkbox") {
        let todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos)
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

// Show remaining tasks
function showTotalTask() {
    totalTask.innerText = CountArr.length;
}

// Saving into localStorage
function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}
// Getting todos after refresh or reopening
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    totalTask.innerText = todos.length;
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Completed checkbox
        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.classList.add("completed-checkbox");
        todoDiv.appendChild(completedCheckbox);

        //Create todo list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Create Delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);
        //attach final Todo
        todoList.appendChild(todoDiv);

    })
}
// Removing todos from localStorage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.findIndex((todoIndex) => todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Adding date and time 
let date = new Date();
let current_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
currentDate.innerText = current_date;

function displayTime() {
    let time = new Date().toLocaleTimeString();
    currentTime.innerHTML = time;
    setTimeout(displayTime, 1000);
}
