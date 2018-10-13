'use strict'

// Pieces Types
var KING_WHITE = '♔';
var QUEEN_WHITE = '♕';
var ROOK_WHITE = '♖';
var BISHOP_WHITE = '♗';
var KNIGHT_WHITE = '♘';
var PAWN_WHITE = '♙';
var KING_BLACK = '♚';
var QUEEN_BLACK = '♛';
var ROOK_BLACK = '♜';
var BISHOP_BLACK = '♝';
var KNIGHT_BLACK = '♞';
var PAWN_BLACK = '♟';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {

            var piece = '';
            if (i === 1) piece = PAWN_BLACK;
            else if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }

    

    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = KING_BLACK;
    board[0][4] = QUEEN_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = KING_WHITE;
    board[7][4] = QUEEN_WHITE;

    console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = ((i + j + 1) % 2 === 0) ? 'black' : 'white';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)" ' +
                'class="    ' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}


function cellClicked(elCell) {

    if (gSelectedElCell && elCell.classList.contains('mark')) {
        movePiece(gSelectedElCell, elCell);
        cleanBoard();
        return;
    }

    cleanBoard();
    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id);
    var piece = gBoard[cellCoord.i][cellCoord.j];

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;
        case KING_BLACK:
        case KING_WHITE:
            possibleCoords = getAllPossibleCoordsKing(cellCoord);
            break;
        case QUEEN_BLACK:
        case QUEEN_WHITE:
            possibleCoords = getAllPossibleCoordsQueen(cellCoord);
            break;

    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    var fromCoord = getCellCoord(elFromCell.id);
    var toCoord = getCellCoord(elToCell.id);
    var piece = gBoard[fromCoord.i][fromCoord.j];

    if (!piece) return;

    // Update the Model
    gBoard[fromCoord.i][fromCoord.j] = '';
    gBoard[toCoord.i][toCoord.j] = piece;

    // Update the DOM
    elToCell.innerText = piece;
    elFromCell.innerText = '';
}

function markCells(coords) {
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        var selector = getSelector(coord);
        var elCell = document.querySelector(selector);
        elCell.classList.add('mark');
    }

}
// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

function cleanBoard() {
    var tds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < tds.length; i++) {
        tds[i].classList.remove('mark', 'selected');
    }
}

function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === '';
}


function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    var res = [];

    var diff = (isWhite) ? -1 : 1;

    var coord = { i: pieceCoord.i + diff, j: pieceCoord.j }

    if (!isEmptyCell(coord)) return res;
    res.push(coord);


    if (isWhite && pieceCoord.i === 6 || !isWhite && pieceCoord.i === 1) {
        diff = (isWhite) ? -2 : 2;
        coord = { i: pieceCoord.i + diff, j: pieceCoord.j }
        if (isEmptyCell(coord)) res.push(coord);
    }
    return res;
}



function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];

    // Moving Down
    var i = pieceCoord.i + 1;
    for (var idx = pieceCoord.j; i >= 0 && i < 8; i++) {
        var coord = { i: i, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // Moving Left
    i = pieceCoord.i;
    for (var idx = pieceCoord.j - 1; idx >= 0 && idx < 8; idx--) {
        var coord = { i: i, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // Moving Right
    i = pieceCoord.i;
    for (var idx = pieceCoord.j + 1; idx >= 0 && idx < 8; idx++) {
        var coord = { i: i, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    // Moving Up 
    i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j; i >= 0 && i < 8; i--) {
        var coord = { i: i, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }

    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;

        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (idx = pieceCoord.j + 1; i < 8 && idx < 8; idx++) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;

        res.push(coord);
    }
    i = pieceCoord.i - 1;
    for (idx = pieceCoord.j - 1; i >= 0 && idx >= 0; idx--) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    i = pieceCoord.i + 1;
    for (idx = pieceCoord.j - 1; i < 8 && idx >= 0; idx--) {
        var coord = { i: i++, j: idx };
        if (!isEmptyCell(coord)) break;
        console.log(coord);
        res.push(coord);
    }

    return res;
}

//sorry about this long long way!
function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    var coord = { i: pieceCoord.i, j: pieceCoord.j };

    if ((pieceCoord.i === 0 && pieceCoord.j === 6) || (pieceCoord.i === 0 && pieceCoord.j === 1)) {

        var coord = { i: pieceCoord.i + 2, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 2, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }
    }

    else if ((pieceCoord.i === 7 && pieceCoord.j === 1) || (pieceCoord.i === 7 && pieceCoord.j === 6)) {
        var coord = { i: pieceCoord.i - 2, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i - 2, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

    }

    else if ((pieceCoord.j === 0) || (pieceCoord.j === 7)) {
        var coord = { i: pieceCoord.i - 1, j: pieceCoord.j + 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 1, j: pieceCoord.j + 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 1, j: pieceCoord.j - 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i - 1, j: pieceCoord.j - 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }
    }
    else {
        var coord = { i: pieceCoord.i + 2, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 2, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i - 2, j: pieceCoord.j + 1 };
        if (isEmptyCell(coord)) {
            var inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i - 2, j: pieceCoord.j - 1 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }
        var coord = { i: pieceCoord.i - 1, j: pieceCoord.j + 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 1, j: pieceCoord.j + 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i + 1, j: pieceCoord.j - 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

        var coord = { i: pieceCoord.i - 1, j: pieceCoord.j - 2 };
        if (isEmptyCell(coord)) {
            inCoord = { i: coord.i, j: coord.j };
            res.push(inCoord);
        }

    }
    return res;
}



function getAllPossibleCoordsKing(pieceCoord) {
    var res = [];

    var coord = { i: pieceCoord.i, j: pieceCoord.j };
    console.log(coord);
    if ((pieceCoord.i !== 0 && pieceCoord.i !== 7) && (pieceCoord.j !== 0 && pieceCoord.j !== 7)) {
        for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
            for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
                coord.i = i;
                coord.j = j;
                if (i === pieceCoord.i && j === pieceCoord.j) {
                    continue;
                }
                else {
                    if (isEmptyCell(coord)) {
                        var inCoord = { i: coord.i, j: coord.j };
                        res.push(inCoord);
                    }
                }

            }
        }
    }

    else {
        if (pieceCoord.i === 0) {
            console.log(coord);
            for (var i = pieceCoord.i; i <= pieceCoord.i + 1; ++i) {
                for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; ++j) {
                    coord.i = i;
                    coord.j = j;
                    if (i === pieceCoord.i && j === pieceCoord.j) {
                        continue;
                    }
                    else {
                        if (isEmptyCell(coord)) {
                            var inCoord = { i: coord.i, j: coord.j };
                            res.push(inCoord);
                        }

                    }


                }
            }
        }

        else if (pieceCoord.i === 7) {
            for (var i = pieceCoord.i; i >= pieceCoord.i - 1; i--) {
                for (var j = pieceCoord.j - 1; j <= pieceCoord.j + 1; j++) {
                    coord.i = i;
                    coord.j = j;
                    if (i === pieceCoord.i && j === pieceCoord.j) {
                        continue;
                    }
                    else {
                        if (isEmptyCell(coord)) {
                            var inCoord = { i: coord.i, j: coord.j };
                            res.push(inCoord);
                        }
                    }
                }
            }
        }

        else if (pieceCoord.j === 0) {
            for (var i = pieceCoord.i - 1; i <= pieceCoord.i + 1; i++) {
                for (var j = pieceCoord.j; j <= pieceCoord.j + 1; j++) {
                    coord.i = i;
                    coord.j = j;
                    if (i === pieceCoord.i && j === pieceCoord.j) {
                        continue;
                    }
                    else {
                        if (isEmptyCell(coord)) {
                            var inCoord = { i: coord.i, j: coord.j };
                            res.push(inCoord);
                        }
                    }
                }
            }
        }

        else if (pieceCoord.j === 7) {
            for (var i = pieceCoord.i - 1; i <= pieceCoord + 1; i++) {
                for (var j = pieceCoord.j; j >= pieceCoord.j - 1; j--) {
                    coord.i = i;
                    coord.j = j;
                    if (i === pieceCoord.i && j === pieceCoord.j) {
                        continue;
                    }
                    else {
                        if (isEmptyCell(coord)) {
                            var inCoord = { i: coord.i, j: coord.j };
                            res.push(inCoord);
                        }
                    }
                }
            }
        }

    }
    console.log(res);
    return res;
}

function getAllPossibleCoordsQueen(pieceCoord) {
    var res1 = getAllPossibleCoordsBishop(pieceCoord);
    var res2 = getAllPossibleCoordsRook(pieceCoord);
    return res1.concat(res2);
}


