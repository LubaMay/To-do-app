'use strict'

let todos = getSavedTodos();

const filters = {
    searchText: '',
    hideCompleted: false
}

renderTodos(todos, filters);

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;   
    renderTodos(todos, filters);
})  

// Listen for todo input to filter
document.getElementById('search-todo').addEventListener('input', (e) => {
    filters.searchText = e.target.value;
    renderTodos(todos, filters);
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const todoTitle = e.target.elements.newTodo.value.trim();

    if(todoTitle.length > 0){
            todos.push({
                id: uuidv4(),
                title: todoTitle,
                completed: false
            }); 
        }

    saveTodos(todos);  
    console.log('pushed to localStorage', todos);
    renderTodos(todos, filters);
    e.target.elements.newTodo.value = '';
})

