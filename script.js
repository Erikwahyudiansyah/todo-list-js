const input = document.querySelector('.todo-input input');
const addButton = document.querySelector('.todo-input button');
const todoList = document.querySelector('.todo-list');

let tasks = [];

// tambah task baru

addButton.addEventListener('click', addTask);

function addTask() {
    const text = input.value.trim();
    if (text == '') {
        alert('Tugas tidak boleh kosong!');
        return;
    }

    const task = {
        text: text,
        done: false // status tugas
    };

    tasks.push(task);
    input.value = '';
    saveTasks();
    renderTasks();
}

    // render ulang list berdasarkan state
    
function renderTasks() {
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    if (task.done) {
        li.classList.add('done');
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <div class="actions">
            <button class="delete" onclick="deleteTask(${index})">✖</button>
            <button class="done" onclick="toggleTask(${index})">✔</button>
        </div>
    `;

     todoList.appendChild(li);
    });

}

// toogle status selesai
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks(); // simpan ke local storage
    renderTasks();
}


// hapus task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // simpan ke local storage
    renderTasks();
}

// simpan state ke local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ambil data dari local storage
function loadTasks() {
    const data = localStorage.getItem('tasks');

    if (data) {
        tasks = JSON.parse(data);
        renderTasks();
    }
}


loadTasks();