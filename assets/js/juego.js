let deck = [];
const types = ["C", "D", "H", "S"];
const specials = ["J", "Q", "K", "A"];

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
  console.log(card);
  return card;
};

//Con esta funcion le damos valores a las cartas especiales
const cardValue = (card) => {
  const value = card.substring(0, card.length - 1);

  return isNaN(value) ? (value === "A" ? 11 : 10) : value * 1;
};

const value = cardValue(pickCard());
console.log(value);
