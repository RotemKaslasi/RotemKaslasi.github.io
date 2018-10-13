'use strict';


var gQuests = [{ id: 1, opts: [], correctOptIndex: 1 },
{ id: 2, opts: [], correctOptIndex: 0 },
{ id: 3, opts: [], correctOptIndex: 0 }];
var gCurrQuestIdx = 0;
var optIdx;

//Play the game
function initGame() {
    createQuests();
    renderQuest();
}

//Enter the answer to gQuest- array
function createQuests() {

    gQuests[0].opts.push('Meir with bow and arrow');
    gQuests[0].opts.push('Hercules with bow and arrow');

    gQuests[1].opts.push('Bugs bunny play basketball');
    gQuests[1].opts.push('Bugs bunny play football');

    gQuests[2].opts.push('Olaf is a snowman');
    gQuests[2].opts.push('Olaf is a banana');

    console.log(gQuests);

}

//Change questions and pictures
function renderQuest() {
    var strHTML = gQuests[gCurrQuestIdx].opts;

    var elButt1 = document.querySelector('#answer0');
    elButt1.innerHTML = strHTML[0];

    var elButt2 = document.querySelector('#answer1');
    elButt2.innerHTML = strHTML[1];

    var pic = document.querySelector('#picture');
    pic.src = "img/" + (gCurrQuestIdx + 1) + ".jpg";


}

//Check if the answer is right
function checkAnswer(optIdx) {
    if (optIdx.slice(-1) == gQuests[gCurrQuestIdx].correctOptIndex) {

        if (gCurrQuestIdx == gQuests.length - 1) {
            var elButt1 = document.querySelector('#answer0');
            var elButt2 = document.querySelector('#answer1');
            var pic = document.querySelector('#picture');
            elButt1.style.display = "none";
            elButt2.style.display = "none";
            pic.src = "https://media.makeameme.org/created/good-job-b73x2g.jpg";
            alert('Very good! you answer: ' + (gCurrQuestIdx + 1) + ' currect answers');

            return;
        }

        gCurrQuestIdx++;
        renderQuest();

    }


    console.log(optIdx);
}

