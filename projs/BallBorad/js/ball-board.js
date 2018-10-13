'use strict'

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/candy.png">';

const collectBallSound = new Audio("./Goal Sound.mp3");

var gGamerPos;
var gGluePos;
var gBoard;
var gBallInterval;
var gCountCollectBalls;
var gCount = 2;
var gIsGlued = false;

function init() {
	gGamerPos = { i: 2, j: 5 };
	gGluePos = { i: 2, j: 6 };
	gBoard = buildBoard();
	runGame(gBoard);

}


function runGame(gBoard){
	updateCount(gCountCollectBalls = 0);
	renderBoard(gBoard);
	newRandomBalls(gBoard);
	changeGLUE(gBoard);
}


function updateCount(gCountCollectBalls) {
	var elCountBalls = document.querySelector('#ballsCollect');
	elCountBalls.innerHTML = gCountCollectBalls;
}


function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	//place the secret passages
	board[0][5].type = FLOOR;
	board[9][5].type = FLOOR;
	board[5][0].type = FLOOR;
	board[5][11].type = FLOOR;

	//place the Glue
	board[gGluePos.i][gGluePos.j].gameElement = GLUE;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';

		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) {
				cellClass += ' floor';

			}
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += '\t' + GAMER_IMG + '\n';
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			else if (currCell.gameElement === GLUE) {
				strHTML += GLUE_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) ||
		(iAbsDiff === 9 && jAbsDiff === 0) || (jAbsDiff === 11 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			updateCount(++gCountCollectBalls);
			gCount--;
			collectBallSound.play();
			console.log('Collecting!');
		}
		if (targetCell.gameElement === GLUE) glueDelay();
		// MOVING
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

	}

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}


function glueDelay() {
	if (gIsGlued === true) return true;
	gIsGlued = true;
	setTimeout(function () {
		gIsGlued = false
	}, 3000);
}


// Move the player by keyboard arrows
function handleKey(event) {
	if (gIsGlued) return;
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			if (i === 5 && j === 0) {
				moveTo(5, 11);
				break;
			}
			moveTo(i, j - 1);
			break;

		case 'ArrowRight':
			if (i === 5 && j === 11) {
				moveTo(5, 0);
				break;
			}
			moveTo(i, j + 1);
			break;

		case 'ArrowUp':
			if (i === 0 && j === 5) {
				moveTo(9, 5);
				break;
			}
			moveTo(i - 1, j);
			break;

		case 'ArrowDown':
			if (i === 9 && j === 5) {
				moveTo(0, 5);
				break;
			}
			moveTo(i + 1, j);
			break;
	}


}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

//Every few seconds a new ball is added in a random empty cell
function newRandomBalls(board) {
	gBallInterval = setInterval(function () {
		var randomBallCell = [];
		if (gameOver(gBoard)) {
			randomBallCell = emptyCells();


			// Get random floor [i,j] 
			var idxBall = randomBallCell[Math.floor(Math.random() * randomBallCell.length)];
			// Update board [i][j]
			board[idxBall[0]][idxBall[1]].gameElement = BALL;
			gCount++;

			renderBoard(board);
		}

	}, 3000);
}

function gameOver(board) {
	if (gCount === 0) {
		console.log('GAME OVER');
		clearInterval(gBallInterval);
	}
	else return true;
}

function emptyCells() {
	var emptyArr = [];
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[0].length; j++) {
			if ((gBoard[i][j].type === FLOOR) && (gBoard[i][j].gameElement === null)) {
				emptyArr.push([i, j]);
			}
		}
	}
	return emptyArr;
}


function changeGLUE(board) {
	var gGlueRemoveInterval = setInterval(function () {
		if (board[gGluePos.i][gGluePos.j].gameElement === GLUE) {
			board[gGluePos.i][gGluePos.j].gameElement = null;
			renderCell(gGluePos, '');
		}

		setTimeout(function () {
			var randomGlueCell = emptyCells();
			var idxGlue = randomGlueCell[Math.floor(Math.random() * randomGlueCell.length)];
			gGluePos = { i: idxGlue[0], j: idxGlue[1] };
			board[gGluePos.i][gGluePos.j].gameElement = GLUE;
			renderCell(gGluePos, GLUE_IMG);
		}, 3000);

	}, 5000);
}










