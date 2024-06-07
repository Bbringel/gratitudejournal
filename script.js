document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks('tasks1');
    loadTasks('tasks2');
});

function addTask(taskInputId, taskListId) {
    const taskInput = document.getElementById(taskInputId);
    const taskList = document.getElementById(taskListId);
    const task = taskInput.value.trim();

    if (task) {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '-';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks(taskListId);
        };

        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
        taskInput.value = '';

        saveTasks(taskListId);
    }
}

function saveTasks(taskListId) {
    const taskList = document.getElementById(taskListId);
    const tasks = [];
    taskList.querySelectorAll('li').forEach(item => {
        tasks.push(item.childNodes[0].nodeValue);
    });
    localStorage.setItem(taskListId, JSON.stringify(tasks));
}

function loadTasks(taskListId) {
    const tasks = JSON.parse(localStorage.getItem(taskListId)) || [];
    const taskList = document.getElementById(taskListId);

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '-';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function () {
            taskList.removeChild(listItem);
            saveTasks(taskListId);
        };

        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);
    });
}
