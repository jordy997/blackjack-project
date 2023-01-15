const myModule = (() => {
  ("use strict");
  let deck = [];
  const types = ["C", "D", "H", "S"],
    specials = ["J", "Q", "K", "A"];

  let playersPoints = [];

  //Referencais HTML
  const requestCard = document.querySelector("#requestCard"),
    newGame = document.querySelector("#newGame"),
    stopRequest = document.querySelector("#stopRequest");

  const divPlayersCards = document.querySelectorAll(".divCartas"),
    htmlPoints = document.querySelectorAll("small");

  //Con esta funcion inicializamos el juego
  const startGame = (numberOfPlayers = 2) => {
    console.clear();
    deck = createDeck();
    playersPoints = [];

    for (let i = 0; i < numberOfPlayers; i++) {
      playersPoints.push(0);
      htmlPoints[i].innerText = 0;
      divPlayersCards[i].innerHTML = "";
    }

    //Estas son opciones adicionales para tener en cuenta en el proyecto
    // htmlPoints.forEach(e => e.innerText = 0)
    // divPlayersCards.forEach((e) => (e.innerHTML = ""));

    requestCard.disabled = false;
    stopRequest.disabled = false;
  };

  //Esta funcion crea una nueva baraja mezclada
  const createDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  // Esta funcion permite tomar una carta
  const requestNewCard = () => {
    if (deck.length === 0) {
      alert("No hay mas cartas en la baraja");
    }
    return deck.pop();
  };

  //Con esta funcion le damos valores a las cartas especiales
  const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
  };

  //Turn: 0 = first player and the last was the computer
  const accumulatePoints = (turn, card) => {
    playersPoints[turn] = playersPoints[turn] + cardValue(card);
    htmlPoints[turn].innerText = playersPoints[turn];
    return playersPoints[turn];
  };

  const createCard = (card, turn) => {
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add("carta");
    divPlayersCards[turn].append(imgCard);
  };

  const determineWinner = () => {
    const [minPoints, computerPoints] = playersPoints;
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

  //Events. El segundo parametro del addEventListener es un callback
  //Player turn
  requestCard.addEventListener("click", () => {
    const card = requestNewCard();
    const playerPoints = accumulatePoints(0, card);
    createCard(card, 0);

    if (playerPoints > 21) {
      console.warn("You lose!");
      requestCard.disabled = true;
      stopRequest.disabled = true;
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
    let computerPoints = 0;
    do {
      const card = requestNewCard();
      const turn = playersPoints.length - 1;

      computerPoints = accumulatePoints(turn, card);
      createCard(card, turn);
    } while (computerPoints < minPoints && minPoints <= 21);
    determineWinner();
  };

  stopRequest.addEventListener("click", () => {
    requestCard.disabled = true;
    stopRequest.disabled = true;
    computerTurn(playersPoints[0]);
  });

  newGame.addEventListener("click", () => {
    startGame();
  });

  return {
    newGame: startGame,
  };
})();
