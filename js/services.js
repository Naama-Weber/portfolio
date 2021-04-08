'use strict';

var gProjs = [
    {
        id: 'minesweeper',
        name: 'Minesweeper',
        title: 'Minesweeper',
        desc: 'My version of the original game, which is a single-player puzzle video game',
        img: 'minesweeper.jpg',
        publishedAt: '29.03.2021',
        labels: ['Matrixes', ' keyboard events'],
        url: 'projects/proj-minesweeper'

    },
    {
        id: 'pacman',
        name: 'Pacman',
        title: 'Pacman',
        desc: 'My version of the classic game',
        img: 'pacman.jpg',
        publishedAt: '22.03.2021',
        labels: ['Matrixes', ' keyboard events'],
        url: 'projects/proj-pacman'
    },
    {
        id: 'guess-me',
        name: 'Guess Me',
        title: 'Guess Me',
        desc: 'My version of the Akinator game',
        img: 'guess-me.jpg',
        publishedAt: '07.04.2021',
        labels: ['jQuery', ' Bootstrap'],
        url: 'projects/proj-guess-me'
    },
    {
        id: 'book-shop',
        name: 'Book Shop',
        title: 'Book Shop',
        desc: 'An online book shop',
        img: 'book-shop.jpg',
        publishedAt: '06.04.2021',
        labels: ['MVC', ' Local Storage'],
        url: 'projects/proj-book-shop'
    },
    {
        id: 'todos',
        name: 'Todos',
        title: 'Todos',
        desc: 'A straight forward todos handler',
        img: 'todos.jpg',
        publishedAt: '04.04.2021',
        labels: ['MVC', ' Local Storage'],
        url: 'projects/proj-todos'
    },
    {
        id: 'ball-board',
        name: 'Ball Board',
        title: 'Ball Board',
        desc: 'A really fun game!',
        img: 'ball-board.jpg',
        publishedAt: '21.03.2021',
        labels: ['Matrixes'],
        url: 'projects/ball-board'
    }
]

function getProjs() {
    return gProjs;
}

function getProjById(projId) {
    return gProjs.find(function (proj) {
        return projId === proj.id
    })
}