'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start section
  var $elStartGame = $('.game-start');
  $elStartGame.hide();
  // show the quest section
  renderQuest();
}

function renderQuest() {
  // select the <h2> inside quest and update
  // its text by the currQuest text
  var currQuest = getCurrQuest();
  console.log('currQuest ', currQuest)
  var $elQuestTitle = $('.quest h2');
  $elQuestTitle.text(currQuest.txt);
  var $elQuest = $('.quest');
  $elQuest.css('display', 'block');
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      // improve UX
    } else {
      alert('I dont know...teach me!');
      // hide and show new-quest section
      var $elQuest = $('.quest');
      $elQuest.css('display', 'none');
      var $elNewQuest = $('.new-quest');
      $elNewQuest.css('display', 'block');
    }
  } else {
    // update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();

  // Get the inputs' values
  // Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes);
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  gLastRes = null;
}
