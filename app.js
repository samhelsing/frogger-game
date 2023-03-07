const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsRight = document.querySelectorAll('.car-right')
const carsLeft = document.querySelectorAll('.car-left')
let lastIndex 
let currentIndex = 76
let logLeftPosition = [7, 8]
let logRightPosition = [0, 1]
let carLeftPosition = 8
let carRightPosition = 0
let timeLeft = 10
let timerId
const width = 9
const rightMod = 72
function moveFrog(e){
    squares[currentIndex].classList.remove('frog')
    
    switch(e.key){
        case 'ArrowLeft':
           if(currentIndex % width !==0) currentIndex -= 1
            // currentIndex % width !== 0 ? currentIndex -= 1 : null //we can also use that
            // lastIndex = currentIndex + 1
            break
        case 'ArrowRight':
            if(currentIndex % width < width -1) currentIndex += 1
            // lastIndex = currentIndex - 1

            break
        case 'ArrowUp':
            if(currentIndex - width >=0 ) {
            currentIndex -= width
            // lastIndex = currentIndex + width
            }
          
            break
        case 'ArrowDown':
            if(currentIndex + width <= 80) {
            currentIndex += width
            // lastIndex = currentIndex - width
            }
            
            break
           
    }
    

squares[currentIndex].classList.add('frog')
// squares[lastIndex].classList.remove('frog') that was my idea



}
function autoMove(){
    timeLeftDisplay.textContent = timeLeft -= 1
    moveLogLeft()
    moveLogRight()
    moveCarLeft()
    moveCarRight()
    lose()
    youWin()
  
}
function moveLogLeft(){
    logsLeft[logLeftPosition[0]].classList.remove('log')
    logsLeft[logLeftPosition[1]].classList.remove('log')
    if(logLeftPosition % width !==0) logLeftPosition[0] -= 1, logLeftPosition[1] -= 1
    if(logLeftPosition[0] === 0) logLeftPosition[0] = 7
    if( logLeftPosition[1] === 1) logLeftPosition[1] = 8 
    logsLeft[logLeftPosition[0]].classList.add('log')
    logsLeft[logLeftPosition[1]].classList.add('log')
}
function moveLogRight(){
    logsRight[logRightPosition[0]].classList.remove('log')
    logsRight[logRightPosition[1]].classList.remove('log')
    if(logRightPosition % width !==0) logRightPosition[0] += 1, logRightPosition[1] += 1
    if(logRightPosition[0] === 7) logRightPosition[0] = 0
    if( logRightPosition[1] === 8) logRightPosition[1] = 1 
    logsRight[logRightPosition[0]].classList.add('log')
    logsRight[logRightPosition[1]].classList.add('log')
}

function moveCarLeft(){
    carsLeft[carLeftPosition].classList.remove('car')
    if(carLeftPosition % width !==0) carLeftPosition -= 1
    if( carLeftPosition ===0 ) carLeftPosition = 8 
    carsLeft[carLeftPosition].classList.add('car')
  
}
function moveCarRight(){
    carsRight[carRightPosition].classList.remove('car2')
    if(carLeftPosition % width !==0) carRightPosition += 1
    if( carRightPosition === 8 ) carRightPosition = 0 
    carsRight[carRightPosition].classList.add('car2')
}


function lose(){
    if(squares[currentIndex].classList.contains('car') ||
        squares[currentIndex].classList.contains('car2') ||
        squares[currentIndex].classList.contains('log') ||
        timeLeft <= 0){
        document.removeEventListener('keyup', moveFrog)
        clearInterval(timerId)
        resultDisplay.textContent = 'you loose'
        squares[currentIndex].classList.remove('frog')
        
    } 
    
   
}
 function youWin(){
    if(squares[currentIndex].classList.contains('ending-block')){
        document.removeEventListener('keyup', moveFrog)
        clearInterval(timerId)
        resultDisplay.textContent = 'you win'
        
       
    }
 }

startPauseButton.addEventListener('click', ()=>{
    if(timerId){
        clearInterval(timerId)
        timeLeft = 10
        document.removeEventListener('keyup', moveFrog)
        timerId = null

    }
 
   else{ 
    timerId = setInterval(autoMove, 500)
    document.addEventListener('keyup', moveFrog)
}


})