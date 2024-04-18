const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
const todoListContainer = document.getElementById('todoList');
const searchInput = document.getElementById('searchInput')

export {
    taskList,
    todoListContainer,
    searchInput
   
}