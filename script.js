document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskWeight = document.getElementById('taskWeight');
    const taskList = document.getElementById('taskList');

    // Get the day of the week from the current page's URL
    const day = window.location.pathname.split('/').pop().split('.')[0];

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.text} - Peso: ${task.weight}
                <button onclick="editTask(${index})">Editar peso</button>
                <button onclick="deleteTask(${index})">Excluir exercicio</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add a new task
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTaskText = taskInput.value.trim();
        const newTaskWeight = taskWeight.value.trim();
        if (newTaskText && newTaskWeight) {
            const tasks = JSON.parse(localStorage.getItem(day)) || [];
            tasks.push({ text: newTaskText, weight: newTaskWeight });
            localStorage.setItem(day, JSON.stringify(tasks));
            taskInput.value = '';
            taskWeight.value = '';
            loadTasks();
        }
    });

    // Edit a task
    window.editTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem(day));
        const task = tasks[index];
        const newWeight = prompt('Digite o novo peso:', task.weight);
        if (newWeight !== null) {
            task.weight = newWeight;
            localStorage.setItem(day, JSON.stringify(tasks));
            loadTasks();
        }
    };

    // Delete a task
    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem(day));
        tasks.splice(index, 1);
        localStorage.setItem(day, JSON.stringify(tasks));
        loadTasks();
    };

    // Initial load
    loadTasks();
});
