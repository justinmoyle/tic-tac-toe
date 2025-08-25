const Gameboard = (() => {
    let gameboard = ["", "", "", "", "", "", "", "", ""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
    }

    return {
        render,
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
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.addEventListener("click", handleClick);
        });
    }
    const handleClick = (event) => {
        let index = parseInt(event.target.id.split("-")[1]);
        alert(index);
    }

    return {
        start,
        handleClick
    }
})();


const startbutton = document.querySelector("#start-button");
startbutton.addEventListener("click", () => {
    Game.start();
})

