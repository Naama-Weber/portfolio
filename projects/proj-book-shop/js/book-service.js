'use strict';

var gBooks = [
    {
        id: makeId(3),
        title: 'The Life List',
        price: 89,
        img: `images/the-life-list.jpeg`,
        desc: makeLorem()
    },
    {
        id: makeId(3),
        title: 'In Search of Lost Time',
        price: 99,
        desc: makeLorem()
        
    },
    {
        id: makeId(3),
        title: 'Ulysses',
        price: 55,
        desc: makeLorem()

    }

]
const KEY = 'books';


function getBooks() {
    var books = gBooks;
    return books;
}

function getBook(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId
    });
}

function _createBook(title, price) {
    return {
        id: makeId(1),
        title: title,
        price: price,
        img: `img/${title}.jpeg`,
        desc: makeLorem()
    }
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    });
    gBooks.splice(bookIdx, 1);
    _saveToStorage();
}


function addBook(title, price) {
    var addedBook = _createBook(title, price);
    gBooks.unshift(addedBook);
    _saveToStorage();
}

function updateBook(bookId, bookPrice) {
    var book = gBooks.find(function(book){
        return book.id === bookId;
    })
    console.log(book)
    book.price = bookPrice;
    _saveToStorage();
}

function viewDetails(bookId){
    var book = getBooks(bookId);
    var elModal = document.querySelector('.details-modal');
    elModal.toggleAttribute('hidden');
    var elModalImg = document.querySelector('.modal-img');
    elModalImg.src = `<img src="${book.img}">`;
    var elModalDetails = document.querySelector('.modal-book-details');
    elModalDetails.innerText = makeLorem(30);

}

// function _createBooks() {
//     var books = loadFromStorage(KEY)
//     gBooks = books;
//     _saveCarsToStorage();
// }

// function _saveBooksToStorage() {
//     saveToStorage(KEY, gBooks)
// }