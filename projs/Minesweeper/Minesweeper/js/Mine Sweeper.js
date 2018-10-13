
'use strict'

// Global var
var gBoard;
var gState = {
    time: 0,
    isGameDone: false
};

var gInterval = 0;
var gCountMines = 0;
var gNumOfMines;

var gLevel = {
    SIZE: 4,
    MINES: gNumOfMines
};

var cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: true
};

var isClockStarted = false;
var MINES_IMG = '<img src="img/1.png" alt= "bomb">';
var FLAG_IMG = '<img src="img/2.png" alt= "flag">';

var smileySad = 0x1F613;
var smileyCool = 0x1F60E;
var smileyNormal = 0x1F607;

//initialize local storge 
// Begginers
if (localStorage.bestScoreBegginers === null) {
    localStorage.setItem("bestScoreBegginers", Infinity);
}
if (localStorage.bestScoreMedium === null) {
    // Medium
    localStorage.setItem("bestScoreMedium", Infinity);
}
if (localStorage.bestScoreExpert === null) {
    // Expert
    localStorage.setItem("bestScoreExpert", Infinity);
}


function updateScore() {

    if (gLevel.SIZE == 4) {
        if (gState.time < Number(localStorage.bestScoreBegginers)) {
            localStorage.setItem("bestScoreBegginers", gState.time);
        }
    }
    else if (gLevel.SIZE == 6) {
        if (gState.time < Number(localStorage.bestScoreMedium)) {
            localStorage.setItem("bestScoreMedium", gState.time);
        }
    }
    else {
        if (gState.time < Number(localStorage.bestScoreExpert)) {
            localStorage.setItem("bestScoreExpert", gState.time);
        }
    }
}



//Start the game and call initGame()
function startGame() {
    isClockStarted = false;
    clearInterval(gInterval);
    var elTime = document.querySelector('#gameTime');
    elTime.innerHTML = 0;
    if (gLevel.SIZE === 4) {
        document.querySelector("#result").innerHTML = localStorage.getItem("bestScoreBegginers")
    }

    else if (gLevel.SIZE === 6) {
        document.querySelector("#result").innerHTML = localStorage.getItem("bestScoreMedium")
    }

    else {
        document.querySelector("#result").innerHTML = localStorage.getItem("bestScoreExpert")
    }
    initGame();
    // Line that lock the right click
    document.addEventListener('contextmenu', event => event.preventDefault());
}


//Create all game 
function initGame() {
    gState = {
        time: 0,
        isGameDone: false
    };

    minesCount();
    gBoard = buildBoard();
    setMines(gBoard);
    setMinesNegsCount(gBoard);
    console.table(gBoard);
    document.getElementById("faces").innerHTML = String.fromCodePoint(smileyNormal);
}


// Check if the cell is empty
function isEmptyCell(board) {
    return gBoard[board.i][board.j].isMine === false;
}


//Random mines at the board
function setMines(board) {
    for (var i = 0; i < gNumOfMines; i++) {
        var randI = Math.floor(Math.random() * board.length);
        var randJ = Math.floor(Math.random() * board.length);
        while (board[randI][randJ].isMine === true) {
            randI = Math.floor(Math.random() * board.length);
            randJ = Math.floor(Math.random() * board.length);
        }
        board[randI][randJ].isMine = true;
    }
    renderBoard(board);
}


//Show how much mines you need to find in this level
function minesCount() {
    if (gLevel.SIZE === 4) {
        gNumOfMines = 2;
        var elMines = document.querySelector('#mines');
        elMines.innerHTML = '2';
    }

    else if (gLevel.SIZE === 6) {
        gNumOfMines = 5;
        var elMines = document.querySelector('#mines');
        elMines.innerHTML = '5';
    }

    else {
        var elMines = document.querySelector('#mines');
        gNumOfMines = 15;
        elMines.innerHTML = '15';
    }
}


//Change level of difficult
function changeDifficulty(level) {
    gLevel.SIZE = level;
}


// Render the board that create
function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var Id = i + '-' + j;
            strHtml += '<td id=cell-' + Id + ' onmousedown="cellClick(this, event)">' + '<button  class="CellButton" id=btn-' + Id + '>'
            strHtml += '</button> </td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClick(cell, event) {
    var coord = getCellCoord(cell.id);
    var btnId = 'btn-' + coord.i + '-' + coord.j;

    //Make a new map if first click is bomb
    while ((gState.time === 0) && (gBoard[coord.i][coord.j].isMine)) {
        initGame();
    }

    //If event is equal to right click- go to cellMarked
    if (event.which === 3) {
        cellMarked(cell);
    }
    else {
        if (!gBoard[coord.i][coord.j].isMarked) {
            document.getElementById(btnId).disabled = true;
            gBoard[coord.i][coord.j].isShown = true;

            if (gBoard[coord.i][coord.j].isMine) {
                for (var i = 0; i < gBoard.length; i++) {
                    for (var j = 0; j < gBoard.length; j++) {
                        if (gBoard[i][j].isMine) {
                            var currBomb = 'btn-' + i + '-' + j;
                            document.getElementById(currBomb).innerHTML = MINES_IMG;

                        }
                    }
                }
                clearInterval(gInterval);
                var elModal = document.querySelector('#gameOverModal');
                elModal.style.display = 'block';
                document.getElementById("faces").innerHTML = String.fromCodePoint(smileySad);

                gState.isGameDone = true;
            }
            else {
                var minesAround = gBoard[coord.i][coord.j].minesAroundCount;
                document.getElementById(btnId).innerHTML = String(minesAround);

                if (minesAround === 0) revealMap(coord.i, coord.j);
            }
        }
    }

    if ((event.which === 3 || event.which === 1) && (gState.time === 0)) {
        if (!isClockStarted) {
            isClockStarted = true;
            gInterval = setInterval(function () {
                var elTime = document.querySelector('#gameTime');
                gState.time++;
                elTime.innerHTML = gState.time;
            }, 1000);
            //console.log(gInterval);
        }
    }

    checkGameOver();
}


//Take cell and return his parts; i and j
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}


//This function create the board
function buildBoard(board) {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    return board;
}


//Add or remove FLAG img with innerHtml and cell.isMarked
function cellMarked(elCell) {
    var coord = getCellCoord(elCell.id);
    var btnId = 'btn-' + coord.i + '-' + coord.j;

    if (!gBoard[coord.i][coord.j].isMarked) {
        document.getElementById(btnId).innerHTML = FLAG_IMG;
        gBoard[coord.i][coord.j].isMarked = true;
    }
    else {
        document.getElementById(btnId).innerHTML = '';
        gBoard[coord.i][coord.j].isMarked = false;
    }
}


function checkGameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) return;
        }
    }
    clearInterval(gInterval);
    var elTime = document.querySelector('#gameTime');
    updateScore();
    var elModal = document.querySelector('#gameOverModal');
    elModal.style.display = 'block';
    document.getElementById("faces").innerHTML = String.fromCodePoint(smileyCool);
}


//If the player want to play again from the modal
function playAgain() {
    var elModal = document.querySelector('#gameOverModal');
    elModal.style.display = 'none';
    startGame();
}


//Check how many mines have to every cell in board
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            board[i][j].minesAroundCount = checkNeg(i, j);

        }
    }
}

// Count how many mines closet to cell neighbours and return the count to setMinesNegsCount
function checkNeg(i, j) {
    var negBombCount = 0;
    for (var row = i - 1; row <= i + 1; row++) {
        if (row >= 0 && row < gBoard.length) {
            for (var col = j - 1; col <= j + 1; col++) {
                if (col >= 0 && col < gBoard.length) {
                    if (gBoard[row][col].isMine === true) {
                        negBombCount++;
                    }
                }
            }
        }
    }

    return negBombCount;
}


//time for recursion 
function revealMap(i, j) {
    for (var row = i - 1; row <= i + 1; row++) {
        if (row >= 0 && row < gBoard.length) {
            for (var col = j - 1; col <= j + 1; col++) {
                if (col >= 0 && col < gBoard.length) {
                    var btnId = 'btn-' + row + '-' + col;
                    document.getElementById(btnId).disabled = true;
                    document.getElementById(btnId).innerHTML =
                        String(gBoard[row][col].minesAroundCount);

                    if ((gBoard[row][col].minesAroundCount === 0) && (!gBoard[row][col].isShown)) {
                        gBoard[row][col].isShown = true;
                        revealMap(row, col);
                    }

                    gBoard[row][col].isShown = true;
                }
            }
        }
    }
}
