'use strict';

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : ''
        return `  
        <li class="${className}" onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button class="btn-remove" onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>`;
    })
    // console.log('strHTMLs', strHTMLs);
    var elTodoList = document.querySelector('.todo-list ul')
    elTodoList.innerHTML = strHTMLs.join('');

    document.querySelector('.stat-total').innerText = getTotalCount();
    document.querySelector('.stat-active').innerText = getActiveCount();

}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    console.log('Removing', todoId);
    var remove = confirm('Are you sure?');
    if (!remove) return;
    removeTodo(todoId);
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();

}

function onAddTodo() {
    var elTxt = document.querySelector('input[name=newTodoTxt]');
    var txt = elTxt.value;
    elTxt.value = '';
    var elImportance = document.querySelector('input[name=importance]');
    var importance = elImportance.value;
    if (!txt) return; // user can't add empty txt
    addTodo(txt, importance);
    elImportance.value = '';
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    console.log('Filtering', filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    setSort(sortBy);
    getSort();
    console.log('Sorting', sortBy);
    renderTodos();
}