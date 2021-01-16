listWithPic = [
    "cat",
    "dog",
    "donkey",
    "monkey",
    "mosquito",
    "penguin",
    "seagull",
    "squirrel",
]

const idToPicture = []
attempts = 0
selected = []


givenOnce = []
givenTwice = []
for (let i = 0; i < 16; i++) {
    let filled = false
    while (filled == false) {
        let temp = Math.floor(Math.random() * 8)
        if (!givenOnce.includes(temp)) {
            givenOnce.push(temp)
            idToPicture.push(temp.toString())
            filled = true
        } else if (!givenTwice.includes(temp)) {
            givenTwice.push(temp)
            idToPicture.push(temp.toString())
            filled = true
        }
    }
}


function clicked(tile) {
    if (!tile.classList.contains("complete")) {
        addPicture(tile)
        if (selected.length == 2) {
            removePicture()
        }
        if (tile != selected[0]) {
            selected.push(tile)
        }
        if (selected.length == 2) {
            comparePicture()
        }
    }
}


function removePicture() {
    selected[0].classList.remove("cat", "dog", "donkey", "mosquito", "seagull", "monkey", "squirrel", "penguin")
    selected[1].classList.remove("cat", "dog", "donkey", "mosquito", "seagull", "monkey", "squirrel", "penguin")
    selected = []
}


function addPicture(tile) {
    tile.classList.add(listWithPic[idToPicture[tile.id - 1]])
}


function comparePicture() {
    let equal = false
    for (let i = 0; i < listWithPic.length; i++) {
        if (selected[0].classList.contains(listWithPic[i]) && selected[1].classList.contains(listWithPic[i])) {
            selected[0].classList.add("complete")
            selected[1].classList.add("complete")
            selected = []
            equal = true
            completed()
            break
        }
    }
    if (equal == false) {
        attempts++
        document.getElementById("toPrint").innerHTML = `Number of failed attempts: ${attempts}`
    }
}


function completed() {
    let done = true
    for (let i = 1; i < 17; i++) {
        if (!document.getElementById(i).classList.contains("complete")) {
            done = false
        }
    }
    if (done == true) {
        document.getElementById("toPrint").innerHTML = `Game over! You guessed wrong ${attempts} times, good job!`
    }
}