const cards = document.querySelectorAll(".memory-card");
let maxMatches = 8;

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  const congrats = document.querySelector("h1");
  const game = document.querySelector(".memory-game");
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  maxMatches = maxMatches - 1;
  if (maxMatches === 0) {
    congrats.classList.add("active");
    game.classList.add("active");

    setTimeout(() => {}, 1000);
  }
  resetBoard();
}

function unflipCards() {
  //not a match
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));
