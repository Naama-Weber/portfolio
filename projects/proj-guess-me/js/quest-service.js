var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = createQuest('Male?');
    gQuestsTree.yes = createQuest('Gandhi');
    gQuestsTree.no = createQuest('Rita');
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    saveToStorage('Current question', gCurrQuest)
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // Create and Connect the 2 Quests to the quetsions tree
    console.log('gCurrQuest ', gCurrQuest)
    console.log('gPrevQuest ', gPrevQuest)
    var newQuest = createQuest(newQuestTxt);
    gPrevQuest[lastRes] = newQuest;
    newQuest.yes = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    gCurrQuest = gQuestsTree;
    saveToStorage('Question', newQuest)
}

function getCurrQuest() {
    return gCurrQuest
}


