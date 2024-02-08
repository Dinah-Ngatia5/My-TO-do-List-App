//Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//function for rendering tasks list 
function renderTaskList() {
    const tasksContainer = document.querySelector('#tasks.container');
    tasksContainer.innerHTML ="";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add("task");
        taskElement.draggable = "true";
        taskElement.setAttribute('data-index', index);
        taskElement.setAttribute("ondragstart",'drag(event');
        //Set the task name
        const taskName = document.createElement('span');
        taskName.textContent = task.text;
        taskElement.appendChild(taskName);
        //Set a Checkbox input type(It is checked when a task is completed)
        const checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;
        checkBox.addEventListener('change', () => {completeTask(index)});
        taskElement.appendChild(checkBox);


        //Button for editing the task item
        const editBtn = document.createElement('button');
        editBtn.textContent = '📝';
        editBtn.addEventListener('click', () => editTask(index));
        taskElement.appendChild(editBtn);

        //Button for Deleting an item from the tasks' list
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(index));
      taskElement.appendChild(deleteBtn);

     tasksContainer.appendChild(taskElement);

    });
}
// function for adding a new task Item from the input field
function addNewTask() {
    const inputTask = document.querySelector('#new-task');
    const inputContent = inputTask.value.trim();
    if(inputContent !== '') {
        tasks.push({ text: inputContent, completed: false});
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskList();
        inputTask.value = "";
}
}
 

//code for the add button functionality
const addBtn =  document.querySelector('#add-task-btn');
addBtn.addEventListener('click', () => {
    addNewTask()
})

//function for editing tasks 
function editTask(index) {
   const newTxt = prompt('Enter new Task text:', tasks[index].text);
   if(newTxt !== null && newTxt.trim() !== "") {
    tasks[index].text = newTxt.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();

   }
}

//function for deleting a task 
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}
//function for declaring a task as complete
function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks',JSON.stringify(tasks));
    renderTaskList();
}
//function for clearing all tasks
function clearTasks() {
    tasks=[];
    localStorage.removeItem('tasks');
    renderTaskList()
} 
//Adding a click event listener to the clear button
const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => {
    clearTasks()
})
// functions for drag and drop api 
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index) 
}
function drop(event) {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData('text/plain');
    const toIndex = event.target.dataset.index;
    if( fromIndex !== toIndex) {
        const [task] = tasks.splice(fromIndex, 1);
        tasks.splice(toIndex, 0, task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTaskList();
    }
}


//Initialization
renderTaskList();
