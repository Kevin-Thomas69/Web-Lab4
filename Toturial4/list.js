document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();
    if (newTask) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        li.textContent = newTask;
        li.onclick = function() {
            this.remove();
            saveTasks();
        };
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }
}

function saveTasks() {
    const taskList = document.getElementById('taskList').children;
    const tasks = [];
    for (let i = 0; i < taskList.length; i++) {
        tasks.push(taskList[i].textContent);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.textContent = ''; 

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        li.onclick = function() {
            this.remove();
            saveTasks();
        };
        taskList.appendChild(li);
    });
}