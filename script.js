let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const choicesBox = document.querySelector("#choices-box");
const winnerMsg = document.querySelector("#winner-msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
}

const drawGame = (userChoice, compChoice) => {
    msg.innerText = "Game was a Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
}

const showResult = (winner) => {
  choicesBox.classList.add("hide");
  // Update the content inside the <span> element
  if (winner == "User") {
    document.getElementById(
      "winner-text"
    ).innerText = `Congratulations! You won the match.`;
  } else {
    document.getElementById(
      "winner-text"
    ).innerText = `You Lost! Play again.`;
  }
  
  winnerMsg.classList.remove("hide");
  msg.innerText = "Play Again";
  msg.style.backgroundColor = "#081b31";
};

msg.addEventListener("click", () => {
    if (msg.innerText == "Play Again") {
        choicesBox.classList.remove("hide");
        // Update the content inside the <span> element
        winnerMsg.classList.add("hide");
        msg.innerText = "Play Your Move";
    }
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
})

function showWinner(userWin, userChoice, compChoice) {
    if (userWin) {
        userScore++;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScorePara.innerText = userScore;
    } else {
        compScore++;
        msg.innerText = `You Lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScorePara.innerText = compScore;
    }
    if (userScore == 5) {
        showResult("User");
    } else if(compScore == 5){
        showResult("Computer");
    }
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame(userChoice, compChoice);
    } else {
        let userWin = true;
        if(userChoice === "rock"){
            //scissors or paper
            userWin = (compChoice === "paper") ? false : true;
        } else if(userChoice === "paper") {
            //scissors or rock
            userWin = (compChoice === "scissors") ? false : true;
        } else {
            //rock or paper
            userWin = (compChoice === "rock") ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
    
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});