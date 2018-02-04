

var guessedLetters = [];

var matrix = ["agent smith", "blue pill", "mr anderson", "architect", "green screen", "morpheus", "the one", "i know kung fu", "oracle"];
var arr = matrix[Math.floor(Math.random() * matrix.length)];
var blank = new Array(arr.length);
var numGuessRem = arr.length + 6;
var wrongGuess = 5;
var continueGame = true;
var photo = document.createElement('img');

for (var i = 0; i < arr.length; i++) {
  if (arr[i].indexOf(' ') >= 0) {
    blank[i] = "\u00A0";
  }
  else {
    blank[i] = ' _ ';
  }
}

function winCounter() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.wincount) {
      sessionStorage.wincount = Number(sessionStorage.wincount) + 1;
      wins = sessionStorage.wincount;
    } else {
      sessionStorage.wincount = 1;
      wins = 0;
    }
    document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
  } else {
    document.getElementById("wins").innerHTML = "Nope";
  }
}

function lossCounter() {
  if (typeof (Storage) !== "undefined") {
    if (sessionStorage.losscount) {
      sessionStorage.losscount = Number(sessionStorage.losscount) + 1;
      losses = sessionStorage.losscount;
    } else {
      sessionStorage.losscount = 1;
      losses = 0;
    }
    document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
  } else {
    document.getElementById("losses").innerHTML = "Nah";
  }
}

function photoLogic() {
  if (wrongGuess === 5) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034';
    photoAppend();
  }
  else if (wrongGuess === 4) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034 ';
    photoAppend();
  }
  else if (wrongGuess === 3) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034';
    photoAppend();
  }
  else if (wrongGuess === 2) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034';
    photoAppend();
  }
  else if (wrongGuess === 1) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034';
    photoAppend();
  }
  else if (wrongGuess === 0) {
    photo.src = 'https://qzprod.files.wordpress.com/2017/03/screen-shot-2017-03-15-at-10-16-30-am-e1489587490512.png?w=1034';
    photoAppend();
  }
}

function photoAppend() {
  emoji.setAttribute('style', 'position: absolute; z-index: 1; height: 80px; width: 80px; top: 25px; left: 45px;');
  document.getElementById('images').appendChild(photo);
}

function include(arr, obj) {

  if (guessedLetters.indexOf(obj) > -1 && numGuessRem >= 1) {
    wrongGuess--;
    photoLogic();
    document.getElementById('status').innerHTML = 'You Guessed That Letter Already, you have ' + wrongGuess + ' wrong guess\' remaining';
  }
  else if (arr.indexOf(obj) === -1 && guessedLetters.indexOf(obj) === -1 && numGuessRem >= 1 && arr.split(" ").toString() != blank.join()) {
    wrongGuess--;
    photoLogic();
    document.getElementById('status').innerHTML = 'Try Again, you have ' + wrongGuess + ' wrong guess\' remaining';
  }
  else {
    document.getElementById('status').innerHTML = 'Good Guess';
  }
  if (obj) {
    guessedLetters.push(obj);
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr.split("")[i] === obj) {
      blank.splice(i, 1, obj);
    }
  }
}

function arraysEqual(arr1, arr2) {

  if (arr1.replace(" ", "") == arr2.join("").replace("\u00A0", "")) {
    winCounter();
    photo.src = 'assets/images/grinningFace.png';
    photoAppend();
    document.getElementById('status').innerHTML = 'You Win!! Press the Enter key to play again';
    return continueGame = false;
  }
  else if (wrongGuess === 0) {
    document.getElementById('status').innerHTML = 'You lost, the answer is ' + arr + ' Press the Enter key to play again';
    lossCounter();
    return continueGame = false;
  }
}

document.getElementById('word').innerHTML = blank.join(' ');
document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');

if (typeof (sessionStorage.wincount) == "undefined") {
  document.getElementById('wins').innerHTML = 'Wins: ' + 0;
}
else {
  document.getElementById("wins").innerHTML = 'Wins: ' + sessionStorage.wincount;
}
if (typeof (sessionStorage.losscount) == "undefined") {
  document.getElementById('losses').innerHTML = 'Losses: ' + 0;
}
else {
  document.getElementById("losses").innerHTML = 'Losses: ' + sessionStorage.losscount;
}


document.onkeyup = function (event) {

  var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
  if (event.keyCode == 13) {
    location.reload();
    continueGame = true;
  }

  else if (continueGame) {

    if (numGuessRem > 0) {
      numGuessRem--;
      include(arr, userGuess);
      arraysEqual(arr, blank);
    }
  }
  document.getElementById('word').innerHTML = blank.join(' ');
  document.getElementById('guessedLetters').innerHTML = guessedLetters.join(' ');
}

