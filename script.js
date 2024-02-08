const inputField = document.querySelector('input[type="text"]');
const todoList = document.querySelector('.todos');
const addBtn = document.querySelector('#add.btn');
const itemsLeftElement = document.querySelector('#items-left');
const allBtn = document.querySelector('#all');
const activeBtn = document.querySelector('#active');
const completedBtn = document.querySelector('#completed');
const clearBtn = document.querySelector('#clear');



let todos = [];
//Check if todos exist in local storage
if(localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodoList();
}

const addTodoItem = () => {
    if(inputField.value.trim() !== "") {
        const todoText = inputField.value;
        inputField.value = "";

        const todoItemId = Math.floor(Math.random() * 10000);

        const newTodoItem = {
            id: todoItemId,
            text: todoText,
            isComplete: false,
        };
        todos.push(newTodoItem);
        localStorage.setItem("todos", JSON.stringify(todos));

        renderTodoList();
    }
};
 inputField.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && inputField.value.trim() !== "") {
        addTodoItem();
    }
 });
   addBtn.addEventListener("click", () => {
    addTodoItem();
   })

   //function for rendering the TodoList
   function renderTodoList() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const newTodoItem = document.createElement('li');
        newTodoItem.className = "card todo-item";
        newTodoItem.setAttribute("draggable", "true");
        newTodoItem.setAttribute('data-index', index)
        const todoContent = `
        <div class = "todo">
        <input type = "checkbox" id="check-box-${todo.id}" 
        ${todo.isComplete ? "checked" : "" }> 
        <label for="check-box-${todo.id}></label>
        <p>${todo.text}</p>
        </div>
     
        `;
        newTodoItem.innerHTML = todoContent;
        todoList.appendChild(newTodoItem);
    });
    addDraggableEventListeners();
}
// Drag and Drop functionality 
let dragStartIndex;
function addDraggableEventListeners() {
    const todoItems = document.querySelectorAll(".todo-item");

    todoItems.forEach((item, index)=> {
        item.addEventListener("dragstart", () => 
        item.classList.add("dragging"))

        item.addEventListener("dragend", () => {
            item.classList.remove("dragging")
            updateTodosOrder();
        })
    })
    todoList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        //get array of all items except the one dragging
        let siblings = [...todoList.querySelectorAll(".todo-item:not(.dragging")];
         
        //find next sibling item after which the dragging item should be placed
         let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offSetHeight / 2;
         });
         // Inserting the dragging item before the found sibling
         todoList.insertBefore(draggingItem, nextSibling);
    });
    todoList.addEventListener('dragenter', e => e.preventDefault());
}
function updateTodosOrder() {
    const updatedTodos = [];
    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach((item) => {
        const index = parseInt(item.getAttribute("data-index"));
        updatedTodos.push(todo[index]);
    });
    todos = updatedTodos;
    localStorage.setItem("todos", JSON.stringify(todos));
}

//function for updatind todo list item completion status


//function for Deleting Todo item 
const deleteItem = () => {

};
// function for updating Items left count
const updateItemsLeft = () => {
    const incompleteItems = todos.filter((todo) => !todo.isComplete);
    itemsLeftElement.textContent = incompleteItems.length;
}
 
// function for clearing completed todos
function clearCompletedTodos() {
    todos = todos.filter((todo) => !todo.isComplete);

    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
    updateItemsLeft();
}
clearBtn.addEventListener('click', () => {
    clearCompletedTodos();
}
)