const X_class = "x"
const Circle_class = "circle"
const cellElements = document.querySelectorAll("[data-cell]")
const screenMessageTextElement = document.querySelector("[data-screen-message-text]")
const screenMessageElement = document.getElementById("screenMessage")
const resetButton = document.getElementById("resetButton")
let circleTurn

const winning = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20]
]

startGame()

resetButton.addEventListener("click", startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove("x")
        cell.classList.remove("circle")
        cell.removeEventListener("click", handleclick)
        cell.addEventListener('click', handleclick, {once: true})
})
screenMessageElement.classList.remove("active")
}

function handleclick(e){
    const cell = e.target
    const currentClass = circleTurn ? Circle_class : X_class
    placeMark(cell,currentClass)
    if (checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else{
        swapTurns()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(Circle_class)
    })
}

function endGame(draw) {
    if(draw){
        screenMessageTextElement.innerText= "Match nul !"
    }  else{
        screenMessageTextElement.innerText = `${circleTurn ? "Joueur O" : "Joueur X"} a gagné !`
    }
    screenMessageElement.classList.add("active")
}

function swapTurns(){
    circleTurn = !circleTurn
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function checkWin(currentClass){
    return winning.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

