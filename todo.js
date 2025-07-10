const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage or empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (task.completed) {
      li.classList.add('completed');
    }
    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn" title="Delete task">&times;</button>
    `;

    // Toggle complete on click of text
    li.querySelector('span').addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    // Delete task button
    li.querySelector('.delete-btn').addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    todoList.appendChild(li);
  });
}

// Handle form submit to add new task
todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    todoInput.value = '';
  }
});

// Initial render
renderTasks();
