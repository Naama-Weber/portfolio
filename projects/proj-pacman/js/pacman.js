'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 6,
            j: 6
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    var nextLocation = getNextLocation(ev);

    var nextCell = gBoard[nextLocation.i][nextLocation.j];

    // return if cannot move
    if (nextCell === WALL) return;
    // hitting a ghost?  call gameOver
    if (nextCell === GHOST) {
        gameOver()
        renderCell(gPacman.location, EMPTY)
        return
    }
    if (nextCell === FOOD) {
        updateScore(1)
        gFoodCounter--
        console.log('updating food counter: ',gFoodCounter);
    }
    if (nextCell === POWER){
        for (var i = 0; i < gGhosts.length; i++){
            var blueGhosts = gGhosts[i].color = 'blue';
        }
    }
    
    if (gFoodCounter === 0){
        isVictory();
    }
    
    // update the model
    setTimeout(blueGhosts, 5000);
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    
    // Move the pacman
    // update the model
    
    gPacman.location = nextLocation;
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    
    // update the DOM
    renderCell(gPacman.location, PACMAN);
}


function getNextLocation(ev) {
    // figure out nextLocation
    // console.log('ev.code', ev.code)
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (ev.code) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        default: return null
    }
    return nextLocation;
}