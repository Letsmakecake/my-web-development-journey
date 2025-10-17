document.addEventListener("DOMContentLoaded",() => {
  const TodoInput = document.getElementById('todo-input')
const AddTaskButton = document.getElementById('add-task-btn')
const TodoList = document.getElementById('todo-list')

let Tasks = JSON.parse(localStorage.getItem('Tasks')) || [];

Tasks.forEach((Task) => renderTask(Task));

AddTaskButton.addEventListener('click', () => {
  const Tasktext = TodoInput.value.trim();
  if(Tasktext ==="") return
  const NewTask = {
    id: Date.now(),
    text: Tasktext,
    completed: false
  }
  Tasks.push(NewTask);
  saveTask();
  renderTask(NewTask)
  TodoInput.value = "";
  console.log(Tasks);

})
function saveTask() {
  localStorage.setItem('Tasks', JSON.stringify(Tasks))
}
function renderTask(Task) {
  const li = document.createElement('li')
  li.setAttribute('data-id',Task.id)
  li.innerHTML=`
  <span>${Task.text}</span>
  <button>Delete</button>`;
  li.addEventListener('click',(e) => {
    if(e.target.tagName === 'BUTTON') return;
    Task.completed = !Task.completed;
    li.classList.toggle('completed')
    saveTask()
  })
  li.querySelector('button').addEventListener('click',(e) => {
    e.stopPropagation()
    Tasks = Tasks.filter((t) => t.id !==Task.id);
    li.remove();
    saveTask();
  })
  TodoList.appendChild(li);
}
})