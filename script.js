let deck = [];
let playerCards = [];
let dealerCards = [];
let gameOver = false;
let money = 10000;
let currentBet = 0;
let hideDealer = true;

function createDeck() {
  const suits = ["♠", "♥", "♦", "♣"];
  const values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  deck = [];

  for (let s of suits) {
    for (let v of values) {
      deck.push({ value: v, suit: s });
    }
  }

  deck.sort(() => Math.random() - 0.5);
}

function cardValue(card) {
  if (card.value === "A") return 11;
  if (["J","Q","K"].includes(card.value)) return 10;
  return parseInt(card.value);
}

function calculateScore(cards) {
  let sum = 0;
  let aceCount = 0;

  for (let c of cards) {
    sum += cardValue(c);
    if (c.value === "A") aceCount++;
  }

  while (sum > 21 && aceCount > 0) {
    sum -= 10;
    aceCount--;
  }

  return sum;
}

function drawCard() {
  if (deck.length === 0) createDeck();
  return deck.pop();
}

function updateMoney() {
  document.getElementById("money").innerText = money;
  document.getElementById("currentBet").innerText = currentBet;
}

function setBet(amount) {
  if (money >= amount) {
    currentBet = amount;
    updateMoney();
  } else {
    alert("Bạn không đủ tiền!");
  }
}

function renderCards() {
  document.getElementById("playerCards").innerHTML =
    playerCards.map(c => `<span class="card">${c.value}${c.suit}</span>`).join("");

  document.getElementById("dealerCards").innerHTML = dealerCards.map((c, i) => {
    if (hideDealer && i === 0 && !gameOver) {
      return `<span class="card hidden">?</span>`;
    }
    return `<span class="card">${c.value}${c.suit}</span>`;
  }).join("");

  document.getElementById("playerScore").innerText = calculateScore(playerCards);
  document.getElementById("dealerScore").innerText =
    hideDealer && !gameOver ? "?" : calculateScore(dealerCards);
}

function startGame() {
  if (currentBet === 0) {
    alert("Chọn mức cược trước!");
    return;
  }

  createDeck();
  playerCards = [drawCard(), drawCard()];
  dealerCards = [drawCard(), drawCard()];
  hideDealer = true;
  gameOver = false;
  document.getElementById("result").innerText = "";
  renderCards();
}

function hit() {
  if (gameOver) return;

  playerCards.push(drawCard());
  renderCards();

  if (calculateScore(playerCards) > 21) {
    money -= currentBet;
    document.getElementById("result").innerText = "💥 Quắc! Bạn thua!";
    gameOver = true;
    hideDealer = false;
    renderCards();
    updateMoney();
  }
}

function stand() {
  if (gameOver) return;

  hideDealer = false;

  while (calculateScore(dealerCards) < 17) {
    dealerCards.push(drawCard());
  }

  let p = calculateScore(playerCards);
  let d = calculateScore(dealerCards);

  if (d > 21 || p > d) {
    document.getElementById("result").innerText = "🎉 Bạn thắng!";
    money += currentBet;
  } else if (p < d) {
    document.getElementById("result").innerText = "😢 Bạn thua!";
    money -= currentBet;
  } else {
    document.getElementById("result").innerText = "🤝 Hòa!";
  }

  gameOver = true;
  renderCards();
  updateMoney();
}

updateMoney();
