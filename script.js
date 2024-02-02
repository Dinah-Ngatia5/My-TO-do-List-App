//Loads tasks from localStorage if available
window.onload = function () {
    var savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks) {
        savedTasks.forEach(function(task){
            addTaskToDOM(task);
        });
    }

}
 function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('task-list');
    var newTask = taskInput.input;
    addTaskToDOM(newTask);
    saveTask(newTask);
    taskInput.value="";
 }
 function addTaskToDOM(task) {
    var taskList = document.getElementById("taskList");
    var newTask = document.createElement("li");
    newTask.textContent = task;
    taskList.appendChild(newTask);
 }
  
 function saveTask(task) {
   var savedTasks = JSON.parse(localStorage.getItem('task')) || [];
   savedTasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(savedTasks));
 }