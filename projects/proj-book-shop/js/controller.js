'use strict';

function onInit() {
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function (book) {
        return `
            <tr>
                <td>${book.id}</td>
                <td class="book-title">${book.title}</td>
                <td>${book.price}₪</td>
                <td><button class="btn-read" onclick="onViewDetails('${book.id}')">Read</button></td>
                <td><button class="btn-update" onclick="onUpdateBook('${book.id}')">Update</button></td>
                <td><button class="btn-delete" onclick="onRemoveBook('${book.id}')">Delete</button></td>
             
            </tr>
        `
    });
    document.querySelector('.books-container').innerHTML = strHtmls.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    var title = prompt('Book\'s title:');
    var price = prompt('Book\'s price:');
    addBook(title, price);
    renderBooks();
}

function onUpdateBook(bookId) {
    var bookPrice = prompt('Updated price');
    updateBook(bookId, bookPrice);
    renderBooks();
}

function onViewDetails(bookId) {
    viewDetails(bookId);
    renderBooks();
}