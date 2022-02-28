let game = {
    currentGame: [],
    playersMoves: [],
    score: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
};

/* reset score to zero, clear playerMoves array */
/* clear currentGame array */
function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }    
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

/* clear playerMoves array */
/* randomly add button id to currentGame array */
/* call showTurn function */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

/* steps throught currentGame and Turn light on/off */
function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

/* add and remove light of circle */
function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

/* check if player move matches computer move, */
/* increment score at end of sequence and add another turn. */
/* if moves not matches show display alert and start new game */
function playerTurn() {
    let i = game.playerMoves.length -1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else{
        alert("wrong move!");
        newGame();
    }
}

/* shows the score in the middle of the circle */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };