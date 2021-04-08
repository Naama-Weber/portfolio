'use strict';

var STORAGE_KEY = 'todosDB';
var gFilterBy = 'all';
var gSortBy = 'text';
var gTodos;
_createTodos();

function getTodosForDisplay() {
    showNoTodos();
    if (gFilterBy === 'all') return gTodos;
    var todos = gTodos.filter(function (todo) {
        return todo.isDone && gFilterBy === 'done' ||
            !todo.isDone && gFilterBy === 'active'
    })
    return todos;
}

function showNoTodos() {
    var elNoTodos = document.querySelector('.no-todos');
    elNoTodos.innerText = 'You still got stuff to do! 🥵'
    var allDone = gTodos.every(function (todo) {
        return todo.isDone;
    });
    if (!gTodos.length) {
        elNoTodos.innerText = 'No Todos Left 😊'
    } else if (allDone) {
        elNoTodos.innerText = 'No Active Todos 😋';
    }
}

function getSort() {
    if (gSortBy === 'text') {
        gTodos.sort(function (a, b) {
            var nameA = a.txt.toLowerCase();
            var nameB = b.txt.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        renderTodos();
    }
    if (gSortBy === 'importance') {
        gTodos.sort(function (a, b) {
            if (a.importance > b.importance) return -1;
            if (a.importance < b.importance) return 1;
            return 0;
        });
        renderTodos();
    }
    if (gSortBy === 'created') {
        gTodos.sort(function (a, b) {
            if (a.createdAt > b.createdAt) return -1;
            if (a.createdAt < b.createdAt) return 1;
            return 0
        });
        renderTodos();
    }
}

function getTotalCount() {
    return gTodos.length;
}
function getActiveCount() {
    var todos = gTodos.filter(function (todo) {
        return !todo.isDone;
    })
    return todos.length;
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {//added importance
    var todo = _createTodo(txt, importance);//added importance
    gTodos.unshift(todo);
    _saveTodosToStorage();
}


function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    if (!todos || todos.length === 0) {
        var todos = [
            _createTodo('Study HTML'),
            _createTodo('Learn CSS'),
            _createTodo('Master Javascript')
        ];
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {//added importance
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(), // timestamp
        importance: importance // importance
    }
    return todo;
}