const input = document.getElementById("taskInput");
const addButton = document.getElementById("addTaskButton");
const list = document.getElementById("todoList");

addButton.addEventListener("click", () => {
  const task = input.value.trim();
  if (task !== "") {
    addTaskToDOM(task);
    saveTask(task);
    input.value = ""; // Clear the input field after adding the task
  }
});

function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Complete";
  completeBtn.addEventListener("click", () => {
    li.style.textDecoration = "line-through"; // Mark task as complete
    completeBtn.disabled = true; // Disable the button after completion
  });

  const deletteBtn = document.createElement("button");
  deletteBtn.textContent = "Delete";
  deletteBtn.addEventListener("click", () => {
    li.remove(); // Remove the task from the list
    deleteTask(taskText); // Delete the task from local storage
  });
  li.appendChild(completeBtn);
  li.appendChild(deletteBtn);
  list.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter((t) => t !== task); // Remove duplicates
  localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
}

window.addEventListener("load", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    addTaskToDOM(task);
  });
});
