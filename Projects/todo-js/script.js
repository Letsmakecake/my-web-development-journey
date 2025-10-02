document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addtask = document.getElementById("add-task-btn");
  const todolist = document.getElementById("todo-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => rendertasks(task));
  addtask.addEventListener("click", () => {
    const blah = todoinput.value.trim();
    if (blah === "") {
      return;
    }
    const newtask = {
      id: Date.now(),
      completed: false,
      text: blah,
    };
    tasks.push(newtask);
    savetasks();
    rendertasks(newtask);
    todoinput.value = "";
    console.log(tasks);
  });
  function rendertasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button> Delete </button>`;
    li.addEventListener("click", (e) => {
      if (e.target.tagName == "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      savetasks();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetasks();
    });
    todolist.appendChild(li);
  }
  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
