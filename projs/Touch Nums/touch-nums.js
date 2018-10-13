'use strict';

//Global var
var level;
var gDifficulty = 4;
var gNextNum;
var gInterval;

//Start the game
function startGame() {
    gNextNum = 1;
    var elBoard = document.querySelector('#nextNumber');
    elBoard.innerHTML = gNextNum;

    clearInterval(gInterval);
    var elTime = document.querySelector('#gameTime');
    elTime.innerHTML = 0;

    initTable();
}

//Build board game, and call a random num from range- array
function initTable() {
    var range = [];
    var strHTML = '';
    for (var i = 0; i < gDifficulty * gDifficulty; i++) {
        range[i] = i + 1;
    }

    for (var i = 0; i < gDifficulty; i++) {
        strHTML += '<tr>';

        for (var j = 0; j < gDifficulty; j++) {
            strHTML += '<td>';
            var temp = Math.floor(Math.random() * (range.length));
            strHTML += '<button class="numButton" onClick=cellClicked(this) value=' + range[temp] + ">" + range[temp] + "</button>";
            range.splice(temp, 1);
            strHTML += '</td>';
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

//Change level of difficult
function changeDifficulty(level) {
    gDifficulty = level;

}


function cellClicked(clickedButt) {
    if (clickedButt.value == gNextNum) {
        gNextNum++;
        clickedButt.style.backgroundColor = "#F0E68C";
        clickedButt.disabled = "true";
        var elBoard = document.querySelector('#nextNumber');
        elBoard.innerHTML = gNextNum;

        if (clickedButt.value == 1) {

            var timer = 0;
            gInterval = setInterval(function () {
                var elTime = document.querySelector('#gameTime');
                timer += 0.01;
                elTime.innerHTML = timer.toFixed(2);
            }, 1);

        }
        if (clickedButt.value == gDifficulty * gDifficulty) {
            clearInterval(gInterval);
            elBoard.innerHTML = "Done!";
        }
    }
}
