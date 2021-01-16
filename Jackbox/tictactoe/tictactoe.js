turn = 0
ended = false
winner = undefined

yellow = []
black = []

//  Hardcoded the possible wincombinations, as it is a small game
//  with fex possibilities and less easier to run
winComb = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

function clicked(tile) {
    if (tile.style.backgroundColor == '') {
        if (turn % 2 == 0) {
            tile.style.backgroundColor = 'yellow'
            yellow.push(parseInt(tile.id))
            if (yellow.length >= 3) {
                check(yellow, "yellow")
            }
        } else {
            tile.style.backgroundColor = 'black'
            black.push(parseInt(tile.id))
            if (black.length >= 3) {
                check(black, "black")
            }
        }
        turn++
        console.log(turn)
    }
}

function check(list, potWinner) {
    if (list.length <= 5) {
        for (let i = 0; i < winComb.length; i++) {
            let ended = true
            for (let j = 0; j < winComb[i].length; j++) {
                if (!list.includes(winComb[i][j])) {
                    ended = false
                }
            }
            if (ended == true) {
                console.log("over")
                gameOver(potWinner)
            }
        }
        if (ended == false && list.length == 5)
            gameOver("draw")
    }
}

function gameOver(winner) {
    ended = true
    document.getElementById("hide").classList.remove("end")
    res = document.getElementById("result")
    if (winner == "draw") {
        res.innerHTML = "Game ended in a draw"
    }
    if (winner == "black") {
        res.innerHTML = "Black won"
    }
    if (winner == "yellow") {
        res.innerHTML = "Yellow won"
    }
}