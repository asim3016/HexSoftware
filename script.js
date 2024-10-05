// Select elements
const taskInput = document.getElementById("new-task");
const taskList = document.getElementById("task-list");
const addTaskBtn = document.getElementById("add-task");

// Load saved tasks from local storage
window.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Add new task
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = "";
  }
});

// Add task to the UI
function addTask(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) li.classList.add("completed");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", () => {
    li.classList.toggle("completed");
    toggleTaskCompletionInLocalStorage(taskText);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    taskList.removeChild(li);
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(completeBtn);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Save task to local storage
function saveTaskToLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => addTask(task.text, task.completed));
}

// Toggle task completion in local storage
function toggleTaskCompletionInLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.map((task) => {
    if (task.text === taskText) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}
