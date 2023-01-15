let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["J", "Q", "K", "A"];

let playerPoints = 0,
  computerPoints = 0;

//Referencais HTML
const requestCard = document.querySelector("#requestCard");
const newGame = document.querySelector("#newGame");
const stopRequest = document.querySelector("#stopRequest");
const htmlPoints = document.querySelectorAll("small");
const playerCards = document.querySelector("#jugador-cartas");
const computerCards = document.querySelector("#computadora-cartas");

//Esta funcion crea una nueva baraja mezclada
const createDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let type of types) {
      deck.push(i + type);
    }
  }
  for (let type of types) {
    for (let sp of specials) {
      deck.push(sp + type);
    }
  }

  deck = _.shuffle(deck);
  return deck;
};

createDeck();

// Esta funcion permite tomar una carta
const pickCard = () => {
  if (deck.length === 0) {
    alert("No hay mas cartas en la baraja");
  }
  const card = deck.pop();
  return card;
};

//Con esta funcion le damos valores a las cartas especiales
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);

  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

//Events. El segundo parametro del addEventListener es un callback
//Player turn
requestCard.addEventListener("click", () => {
  const card = pickCard();
  playerPoints = playerPoints + cardValue(card);
  htmlPoints[0].innerText = playerPoints;

  const imgCard = document.createElement("img");
  imgCard.src = `assets/cartas/${card}.png`;
  imgCard.classList.add("carta");
  playerCards.append(imgCard);

  if (playerPoints > 21) {
    console.warn("You lose!");
    requestCard.disabled = true;
    computerTurn(playerPoints);
  } else if (playerPoints === 21) {
    console.warn("21, great!");
    requestCard.disabled = true;
    stopRequest.disabled = true;
    computerTurn(playerPoints);
  }
});

// Computer turn
const computerTurn = (minPoints) => {
  do {
    const card = pickCard();
    computerPoints = computerPoints + cardValue(card);
    htmlPoints[1].innerText = computerPoints;

    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("carta");
    computerCards.append(imgCard);

    if (minPoints > 21) {
      break;
    }
  } while (computerPoints < minPoints && minPoints <= 21);
  setTimeout(() => {
    computerPoints === minPoints
      ? alert("Es un empate, nadie gana")
      : minPoints > 21
      ? alert("La computadora gana!")
      : computerPoints > 21
      ? alert("El jugador gana!")
      : alert("La computadora gana");
  }, 200);
};

stopRequest.addEventListener("click", () => {
  requestCard.disabled = true;
  stopRequest.disabled = true;
  computerTurn(playerPoints);
});

newGame.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = createDeck();
  playerPoints = 0;
  computerPoints = 0;

  htmlPoints[0].innerText = 0;
  htmlPoints[1].innerText = 0;

  playerCards.innerHTML = "";
  computerCards.innerHTML = "";

  requestCard.disabled = false;
  stopRequest.disabled = false;
});
