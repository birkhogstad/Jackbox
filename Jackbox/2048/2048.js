// Potential fix:
//move-methods combined
//code without as many classes (.classList) (??)
//make a nested list with same values (for easier access)

totalPoints = 0
started = false
gameIsOver = false
potValues = ["is2", "is4", "is8", "is16", "is32", "is64", "is128", "is256", "is512", "is1024", "is2048"]
val = [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
addRandom()
addRandom()


function addRandom() {
    let added = false
    while (added == false) {
        current = document.getElementById((Math.floor(Math.random() * 16) + 1))
        if (current.innerHTML == 0) {
            added = true
        }
    }
    num = Math.floor(Math.random() * 2)
    current.classList.add("show")
    if (num == 0) {
        current.innerHTML = 4
        current.classList.add("is4")
    } else {
        current.innerHTML = 2
        current.classList.add("is2")
    }
}

function swapWithNull(tileNull, tileWithValue) {
    tileNull.innerHTML = tileWithValue.innerHTML
    tileWithValue.innerHTML = 0
    tileNull.classList.add("show")
    tileWithValue.classList.remove("show")
    for (let i = 0; i < potValues.length; i++) {
        if (tileWithValue.classList.contains(potValues[i])) {
            tileNull.classList.add(potValues[i])
            tileWithValue.classList.remove(potValues[i])
        }
    }
}


function addAtFirst(first, second) {
    for (let i = 0; i < potValues.length; i++) {
        if (first.classList.contains(potValues[i])) {
            first.classList.remove(potValues[i])
            second.classList.remove(potValues[i])
            first.classList.add(potValues[i + 1])
            break;
        }
    }
    second.classList.remove("show")
    first.classList.add("checker")
    first.innerHTML = first.innerHTML * 2
    totalPoints += parseInt(first.innerHTML)
    second.innerHTML = 0
    updateScore()
}

function updateScore() {
    toPrint = document.getElementById("score");
    toPrint.innerHTML = `Score: ${totalPoints}`
}

function removeCheckers() {
    for (let i = 1; i < 17; i++) {
        current = document.getElementById(i)
        if (current.classList.contains("checker")) {
            current.classList.remove("checker")
        }
    }
}


function moveLeft() {
    movement = false
    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 5; col++) {
            current = document.getElementById((row * 4) + col)
            pos = col
            if (current.innerHTML != 0) {
                while (pos > 1) {
                    pos--
                    toSwap = document.getElementById((row * 4) + pos)
                    if (toSwap.innerHTML == 0) {
                        swapWithNull(toSwap, current)
                        current = toSwap
                        movement = true
                    } else if (toSwap.innerHTML == current.innerHTML && !toSwap.classList.contains("checker")) {
                        addAtFirst(toSwap, current)
                        pos = 1
                        movement = true
                    } else {
                        pos = 1
                    }
                }
            }
        }
    }
    if (movement == true) {
        addRandom()
    }
}

function gameOver() {
    over = true
    for (let i = 1; i < 17; i++) {
        current = document.getElementById(i)
        if (current.innerHTML != 0) {
            if (i % 4 != 0) {
                if (document.getElementById(i + 1).innerHTML == current.innerHTML || document.getElementById(i + 1).innerHTML == 0) {
                    over = false
                }
            }
            if (i <= 12) {
                if (document.getElementById(i + 4).innerHTML == current.innerHTML || document.getElementById(i + 1).innerHTML == 0) {
                    over = false
                }
            }
        } else {
            over = false
        }

    }
    if (over == true) {
        toPrint = document.getElementById("score");
        toPrint.innerHTML = `Game over! You had ${totalPoints} in score`
        gameIsOver = true
    }
}




function moveRight() {
    movement = false
    for (let row = 0; row < 4; row++) {
        for (let col = 4; col > 0; col--) {
            current = document.getElementById((row * 4) + col)
            pos = col
            if (current.innerHTML != 0) {
                while (pos < 4) {
                    pos++
                    toSwap = document.getElementById((row * 4) + pos)
                    if (toSwap.innerHTML == 0) {
                        swapWithNull(toSwap, current)
                        current = toSwap
                        movement = true
                    } else if (toSwap.innerHTML == current.innerHTML && !toSwap.classList.contains("checker")) {
                        addAtFirst(toSwap, current)
                        pos = 4
                        movement = true
                    } else {
                        pos = 4
                    }
                }
            }
        }
    }
    if (movement == true) {
        addRandom()
    }
}

function moveUp() {
    movement = false
    for (let row = 1; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
            current = document.getElementById((col * 4) + row)
            pos = col
            if (current.innerHTML != 0) {
                while (pos > 0) {
                    pos--
                    toSwap = document.getElementById((pos * 4) + row)
                    if (toSwap.innerHTML == 0) {
                        swapWithNull(toSwap, current)
                        current = toSwap
                        movement = true
                    } else if (toSwap.innerHTML == current.innerHTML && !toSwap.classList.contains("checker")) {
                        addAtFirst(toSwap, current)
                        pos = 0
                        movement = true
                    } else {
                        pos = 0
                    }
                }
            }
        }
    }
    if (movement == true) {
        addRandom()
    }
}

function moveDown() {
    movement = false
    for (col = 1; col < 5; col++) {
        for (let i = 4; i > 0; i--) {
            current = document.getElementById((i - 1) * 4 + col)
            pos = i
            if (current.innerHTML != 0) {
                while (pos < 4) {
                    pos++
                    toSwap = document.getElementById(((pos - 1) * 4) + col)
                    if (toSwap.innerHTML == 0) {
                        swapWithNull(toSwap, current)
                        current = toSwap
                        movement = true
                    } else if (toSwap.innerHTML == current.innerHTML && !toSwap.classList.contains("checker")) {
                        addAtFirst(toSwap, current)
                        pos = 4
                        movement = true
                    } else {
                        pos = 4
                    }
                }
            }

        }

    }
    if (movement == true) {
        addRandom()
    }


}



function disp(str) {
    document.getElementById('my_msg').innerHTML = str
}
document.onkeydown = function () {
    if (gameIsOver == false) {
        switch (window.event.keyCode) {
            case 37:
                moveLeft()
                gameOver()
                break
            case 65:
                moveLeft()
                gameOver()
                break
            case 38:
                moveUp()
                gameOver()
                break
            case 87:
                moveUp()
                gameOver()
                break
            case 39:
                moveRight()
                gameOver()
                break
            case 68:
                moveRight()
                gameOver()
                break
            case 40:
                moveDown()
                gameOver()
                break
            case 83:
                moveDown()
                gameOver()
                break
        }
        removeCheckers()

    }
}

