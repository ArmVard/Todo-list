const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
const todoListContainer = document.getElementById('todoList');
const searchInput = document.getElementById('searchInput')
const done =document.getElementById('allBtnDone')
const cross=document.getElementById('allBtnCross')

export {
    taskList,
    todoListContainer,
    searchInput,
    done,
    cross
}