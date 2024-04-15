import { createListener } from "./helpers.js";
import { taskList, todoListContainer, searchInput, done, cross } from "./constants.js";


createListener('colorPicker', 'input', (e) => {
    localStorage.setItem('bgColor', e.target.value);
    document.body.style.backgroundColor = e.target.value;

})

createListener('searchInput', 'input', () => {
    const value = searchInput.value.toLowerCase();
    const filtered = taskList.filter((task) => {
        return task.todo.toLowerCase().match(value)
    })
    renderList(filtered)
})


createListener('addTodoForm', 'submit', (e) => {
    e.preventDefault();
    const inputValue = document.getElementById('todoInput').value;
    document.getElementById('todoInput').value = '';
    const task = {
        isDone: false,
        todo: inputValue
    }
    taskList.push(task);
    changeLocaleStorage();
    renderList();



})


function changeLocaleStorage() {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

function changeTodo(e) {
    const element = e.target;
    const parent = element.parentElement;
    console.log(element, parent, 'sadsada');
    if (e.target.className === 'doneBtn') {
        const index = parent.dataset.index;
        taskList[index].isDone = !taskList[index].isDone;
        changeLocaleStorage();
        renderList();
    } else if (
        e.target.className === 'removeBtn') {
        const index = parent.dataset.index;
        taskList.splice(index, 1);
        changeLocaleStorage();
        renderList();
    }
}


todoListContainer.addEventListener('click', changeTodo);

function renderList(listData = taskList) {
    const liElements = listData.map((item, index) => {
        const myClass = item.isDone ? 'done' : '';

        return (
            `
            <li  data-index=${index} class="${myClass}">${item.todo}
            <button class="removeBtn">&#10062;</button> 
            <button class="doneBtn">&#9989;</button>

            </li>

            `
        )
    });

    todoListContainer.innerHTML = liElements.join('');
};


(function () {
    const bgColor = localStorage.getItem('bgColor');
    document.body.style.backgroundColor = bgColor;
    renderList();
})();




const showButtons = document.querySelectorAll('.showButton');
showButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const { key } = e.target.dataset;
        if (key === 'doneTodo') {
            const completedTasks = taskList.filter(task => task.isDone === true);
            renderCompletedTasks(completedTasks);
        } else if (key === 'crossTodo') {
            const completedTasks = taskList.filter(task => task.isDone === false);
            renderCompletedTasks(completedTasks);

        }
    });
});


function renderCompletedTasks(completedTasks) {
    const doneList = document.getElementById('doneList');
    doneList.innerHTML = '';
    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.todo;
        doneList.appendChild(li);
    });
}

