gameOver = false
turn = 1
let board = [[], [], [], [], [], [], []]


function insert(r) {
    if (gameOver == false) {
        rowId = parseInt(r.id) / 100
        rowToInsert = board[rowId - 1]
        if (rowToInsert.length < 7) {
            idToInsert = (42 + rowId) - (rowToInsert.length * 7)
            element = document.getElementById(idToInsert)
            turn++
            player = turn % 2
            if (player == 0) {
                element.style.backgroundColor = 'black'
                rowToInsert.push(0)
            } else {
                element.style.backgroundColor = 'yellow'
                rowToInsert.push(1)
            }
            checkIfWon(rowId - 1, rowToInsert.length - 1)
        }
    }
}


function checkIfWon(inputRow, inputCol) {
    potWin = board[inputRow][inputCol]
    let counter = 1
    let isOk = true
    //Checking vertical
    if (inputCol >= 3) {
        let i = inputCol
        while (isOk == true) {
            if (board[inputRow][i - 1] != potWin || i <= 0) {
                isOk = false
            } else {
                counter++
                i--
                checkForWin(counter)
            }
        }
    }
    //Checking horisontal
    if (board[3][inputCol] != undefined) {
        let reachedLeft = false
        let reachedRight = false
        let leftPointer = inputRow - 1
        let rightPointer = inputRow + 1
        isOk = true
        while (reachedLeft == false) {
            if (leftPointer <= 0 || board[leftPointer][inputCol] != potWin) {
                reachedLeft = true
            } else {
                leftPointer--
                counter++
            }
        }
        while (reachedRight == false) {
            if (rightPointer >= 6 || board[rightPointer][inputCol] != potWin) {
                reachedRight = true
            } else {
                rightPointer++
                counter++
            }
        }
        checkForWin(counter)
        counter = 1
    }

    //Checking diagonals
    let x = inputRow
    let y = inputCol

    let xValue = x
    let yValue = y
    let reachedEnd = false
    while (reachedEnd == false) {
        if ((xValue <= 0 || yValue <= 0) || board[xValue - 1][yValue - 1] != potWin) {
            reachedEnd = true
        } else {
            xValue--
            yValue--
            counter++
        }
    }
    xValue = x
    yValue = y
    reachedEnd = false
    while (reachedEnd == false) {
        if ((xValue >= 6 || yValue >= 6) || board[xValue + 1][yValue + 1] != potWin) {
            reachedEnd = true
        } else {
            xValue++
            yValue++
            counter++
        }
    }
    checkForWin(counter)
    counter = 1
    xValue = x
    yValue = y
    reachedEnd = false
    while (reachedEnd == false) {
        if ((xValue >= 6 || yValue <= 0) || board[xValue + 1][yValue - 1] != potWin) {
            reachedEnd = true
        } else {
            xValue++
            yValue--
            counter++
        }
    }
    xValue = x
    yValue = y
    reachedEnd = false
    while (reachedEnd == false) {
        if ((xValue <= 0 || yValue >= 6) || board[xValue - 1][yValue + 1] != potWin) {
            reachedEnd = true
        } else {
            xValue--
            yValue++
            counter++
        }
    }
    checkForWin(counter)
}


function announceWinner(theWinner) {
    gameOver = true
    let won = document.getElementById("toPrint")
    if (theWinner != 2) {
        if (theWinner == 0) {
            theWinner = "Black"
        } else if (theWinner == 1) {
            theWinner = "Yellow"
        }
        won.innerHTML = `${theWinner} won!`
    } else {
        won.innerHTML = "The game ended in a draw"
    }
}


function checkForWin(c) {
    if (c >= 4) {
        announceWinner(turn % 2)
    }
    if (gameOver == false) {
        let drawChecker = true
        for (let i = 0; i < board.length; i++) {
            if (board[i].length < 7) {
                drawChecker = false
                break
            }
        }
        if (drawChecker == true) {
            announceWinner(2)
        }
    }
}

