let secretNumber = Math.floor(Math.random() * 101);
let score = 0;

const shootBtn = document.getElementById("shootBtn");
const resultDiv = document.getElementById("result");
const effectDiv = document.getElementById("effect");
const scoreSpan = document.getElementById("score");
const guideBtn = document.getElementById("guideBtn");
const guideDiv = document.getElementById("guide");

shootBtn.addEventListener("click", () => {
  const guess = Number(document.getElementById("guessInput").value);

  if (isNaN(guess) || guess < 0 || guess > 100) {
    resultDiv.innerText = "Please enter a valid number from 0 to 100!";
    effectDiv.innerText = "";
    return;
  }

  if (guess === secretNumber) {
    resultDiv.innerText = "🎉 Congratulations bro, you win!";
    effectDiv.innerText = "🏀 Swish! Perfect shot!";
    score++;
    scoreSpan.innerText = score;
    secretNumber = Math.floor(Math.random() * 101);
  } else {
    resultDiv.innerText = "😵 Bro, why are you so dizzy?";
    effectDiv.innerText = "❌ Missed the shot!";
  }

  document.getElementById("guessInput").value = "";
});

guideBtn.addEventListener("click", () => {
  guideDiv.classList.remove("hidden");
});

function closeGuide() {
  guideDiv.classList.add("hidden");
}
