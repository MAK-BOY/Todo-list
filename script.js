const todoContainer = document.querySelector("#taskList");
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
let edit = null;

// Initialize task array
let tasks = [];

// Load tasks from localStorage
const storedTasks = localStorage.getItem("tasks");
if (storedTasks) {
   tasks = JSON.parse(storedTasks);
}

// Display tasks on page load
displayTasks();

// Add new task on button click
addTaskBtn.addEventListener("click", function () {
   if (edit != null) {
      tasks.splice(edit, 1, { name: taskInput.value });
      edit = null;
      addTaskBtn.textContent = "Add";
   }
   else{

      const taskName = taskInput.value;
         tasks.push({ name: taskName });
      
      }
      saveTasks(tasks);
      displayTasks();
      taskInput.value = "";
});

// Display tasks in the container
function displayTasks() {
   let clutter = "";
   tasks.forEach((task, index) => {
      clutter += `
     
        <li class="completed">
          <div class="task">
            <span>${index + 1}</span>
            <span>${task.name}</span>
          </div>
          <div class="actions">
            <button class="edit" onclick="editTask(${index + 1})">Edit</button>
            <button class="delete" onclick="deleteTask(${index +1})">Delete</button>
          </div>
        </li>
   `;
   });
   todoContainer.innerHTML = clutter;
}

// Save tasks to localStorage
function saveTasks(taskArray) {
   localStorage.setItem("tasks", JSON.stringify(taskArray));
}



function editTask(index) {
    edit = tasks[index - 1];
   taskInput.value = edit.name;
   addTaskBtn.textContent = "Save";

}


function deleteTask(index) { 
   tasks.splice(index-1,1)
   saveTasks(tasks)
   displayTasks()
}