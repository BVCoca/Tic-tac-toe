const cells = document.querySelectorAll("[data-cell]");
const p1 = 'X'; const p2 = 'O';
let playerTurn = p1;

const patternWin = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [3, 5, 8],
      [2, 4, 6],
      [2, 5, 8]
  ]

cells.forEach(cell => {
    cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
    e.target.innerHTML = playerTurn;

    if (checkWin(playerTurn)) {
        updateStatus("wins" + playerTurn);
        return endGame();
    } else if (checkDraw()) {
        updateStatus("draw");
        return endGame();
    }

    updateStatus(playerTurn);
    playerTurn == p1 ? playerTurn = p2 : playerTurn = p1
}

function checkWin(playerTurn) {
    return patternWin.some(combinaisons => {
        return combinaisons.every(combinaison => {
            return cells[combinaison].innerHTML == playerTurn;
        });
    });
}

function checkDraw() {
    return [...cells].every(cell => {
        return cell.innerHTML == p1 || cell.innerHTML == p2;
    });
}

function updateStatus(status) {
    let statusText;

    switch (status) {
        case 'X':
            statusText = "Joueur 2, à toi d'jouer ! (O)"
            break;
        case 'O':
            statusText = "Joueur 1, à toi d'jouer ! (X)"
            break;
        case 'winsX':
            statusText = "Joueur 1, tu as gagné !"
            break;
        case 'winsO':
            statusText = "Joueur 2, tu as gagné !"
            break;
        case 'draw':
            statusText = "Personne ne gagne cette partie."
            break;
    }

    gameStatus.innerHTML = statusText;
    endGameStatus.innerHTML = statusText;
}

function endGame() { document.getElementById('endGame').style.display = "block" }
function reloadGame() { window.location.reload() }