var game = {
  score: 0,
  lives: 6,
}

var lost = false;
var checkedLetters = [];

var countryToGuess = data[getRandomInt(0, data.length)]['country'];
spawnHiddenWord(countryToGuess);

document.getElementById("score").innerHTML = game.score;
document.getElementById("guessCount").innerHTML = game.lives;

console.log(countryToGuess);

function spawnHiddenWord(countryToGuess) {
  var playerGuess = document.getElementById('playerGuess');
  var block = createNewBlock();
  for (var i = 0; i < countryToGuess.length; i++) {
    if (countryToGuess[i] === ' ') {
      playerGuess.appendChild(block);
      block = createNewBlock();
    } else {
      block.appendChild(insertEmptyBlock(i));
    }
    playerGuess.append(block);
  }
}



function createNewBlock() {
  var block = document.createElement('div');
  block.classList.add('block');
  return block;
}

function insertEmptyBlock(i) {
  var emptyBlock = document.createElement('div');
  emptyBlock.i = 'char-' + i;
  emptyBlock.classList.add('emptyBlock');
  emptyBlock.setAttribute("id", 'block' + i);
  emptyBlock.innerHTML = countryToGuess[i];
  return emptyBlock;
}

document.getElementById("graj").addEventListener("click", checkLetters);

function checkLetters() {
  var letter = document.getElementById('wpiszLitere').value;
  var occurrences = 0;

  if (game.lives == 0) {
    alert("Przegrałeś!");
    lost = true;
    return;
  }

  if(game.score == countryToGuess.length)
  {
    alert("Wygrałeś!");
    return;
  }

  if (checkedLetters.includes(letter)) {
    alert("Sprawdzano już tą literę!");
    return;
  } else {
    checkedLetters.push(letter);
  }

  for (var i = 0; i < countryToGuess.length; i++) {
    if (letter.toLowerCase() === countryToGuess[i].toLowerCase()) {
      document.getElementById('block' + i).style.color = 'rgb(255, 255, 255)';
      occurrences++;
    }
  }

  if (occurrences > 0) {
    game.score += occurrences;
    document.getElementById("score").innerHTML = game.score;
  } else {
    game.lives--;
    document.getElementById("guessCount").innerHTML = game.lives;
    if (game.lives == 0) {
      alert("Przegrałeś!");
    }
  }  

  if(game.score == countryToGuess.length)
  {
    alert("Wygrałeś!");
    return;
  }

}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
