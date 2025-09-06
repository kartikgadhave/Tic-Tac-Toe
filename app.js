let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for O's turn, false for X's turn
let gameCount = 0; // To track number of moves

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            // Player O's turn
            box.innerText = "O";
            box.style.color = "red";
            box.style.backgroundColor = "#c2c5aa";
            turnO = false;
        } else {
            // Player X's turn
            box.innerText = "X";
            box.style.color = "black";
            box.style.backgroundColor = "#99d98c";
            turnO = true;
        }

        box.disabled = true;
        gameCount++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = "white";
        box.style.color = "red";
    }
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner} 🎉`;
    msg.classList.remove("draw-msg");
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = "🤝 It's a Draw! 🤝";
    msg.classList.add("draw-msg");
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    // Check for draw
    if (gameCount === 9) {
        showDraw();
    }
};

const resetGame = () => {
    turnO = true;
    gameCount = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);