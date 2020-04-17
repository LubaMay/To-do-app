'use strict'

// Fetch existing todos from localStorage

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos');

    try {
        return todosJSON ? JSON.parse(todosJSON) : []        
    } catch (e) {
        return []
    }
}

// Save todos to localStorage

const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));    
}

// Remove todo from the list

const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}

// Toggle the completed value for a given todo

const toggleTodo = (id) => {
       const todo = todos.find((todo) => todo.id === id)

        if(todo) {
            todo.completed = !todo.completed;
        }
    }

// Render application todos based on filters

const renderTodos = (todos, filters) => {
    
       const filteredTodos = todos.filter((todo) => {
        
           const textMatched = todo.title.toLowerCase().includes(filters.searchText.toLowerCase());
   
           // exec only if hiding and text matched
           if(filters.hideCompleted && textMatched) {
               if(todo.completed) {
                   return false;
               } 
           } 
           return textMatched;
       })

   
       document.querySelector('#todos').innerHTML = '';
   
       const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

       document.querySelector('#todos').appendChild(generateSummaryDOM(incompleteTodos));

       if(filteredTodos.length > 0) {
            filteredTodos.forEach((todo) => {
                document.querySelector('#todos').appendChild(generateTodoDOM(todo))
            })
       } else {
            const emptyMessage = document.createElement('p')
            emptyMessage.classList.add('empty-message')
            emptyMessage.textContent = 'No to-dos to show'
            document.querySelector('#todos').appendChild(emptyMessage)
       }
}

 // Get the DOM elements for an individual todo
 const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div')
    const checkBox = document.createElement('input');
    const todoText = document.createElement('span');

    // Setup todo checkbox
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = todo.completed; // true when todo is completed
    checkBox.setAttribute('id', 'chb' + 1);
    containerEl.appendChild(checkBox);

    checkBox.addEventListener('change', function(e) {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);

        return todo;
    })


    // Setup the todo text 
    todoText.textContent = todo.title;
    containerEl.appendChild(todoText);

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // Setup the remove todo button
    const button = document.createElement('button');
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    todoEl.appendChild(button);
    button.addEventListener('click', (e) => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })


    return todoEl;
 }

 // Get the DOM elements for list summary

 const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if(incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`        
    }

    return summary;
 }