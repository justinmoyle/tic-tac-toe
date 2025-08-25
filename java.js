const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            const contentClass = square === "X" ? "x-mark" : square === "0" ? "o-mark": "";
            boardHTML += `<div class="square ${contentClass}" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

    const update = (index, mark) => {
        if (gameboard[index] === ""){
            gameboard[index] = mark;
            return true;
        }
        return false;
    }

    const getGameboard = () => gameboard;

    return {
        render,
        update,
        getGameboard
    }
})();

const createPlayer = (name, mark) => {
    return {
        name, 
        mark
    }
}

const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver = false;

    const start = () => {
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "0"),
        ]
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.render();
        addEventListenerToSquares();
        document.querySelector("#result-display").textContent = "";
    }

    const addEventListenerToSquares = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        });
    }

    const handleClick = (event) => {
        if (gameOver) return;

        let index = parseInt(event.target.id.split("-")[1]);
        let currentPlayer = players[currentPlayerIndex];
        
        if (Gameboard.update(index, currentPlayer.mark)) {
            Gameboard.render();
            addEventListenerToSquares();

            if(checkForWin() || checkForTie()) {
                gameOver = true;
                displayMessage(checkForWin() ? `${currentPlayer.name} Wins!` : "It's a tie!");
                return;
            }

            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    }

    const displayMessage = (message) => {
        document.querySelector("#result-display").textContent = message;
    }

    const checkForWin = () => {
        const winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const gameboard = Gameboard.getGameboard();
        return winningConditions.some(condition => {
            const [a, b, c] = condition;
            return gameboard[a] && gameboard [a] === gameboard[b] && gameboard[a] === gameboard[c];
        });
    }

    const checkForTie = () => {
        const gameboard= Gameboard.getGameboard();
        return gameboard.every(square => square !== "");
    }

    return {
        start,
    }
})();


const startbutton = document.querySelector("#start-button");
startbutton.addEventListener("click", () => {
    Game.start();
})

