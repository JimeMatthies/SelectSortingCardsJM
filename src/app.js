/* eslint-disable */
import "bootstrap";
import "./style.css";

const suits = ["♣", "♦", "♥", "♠"];
const ranks = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13"
];
const cardSection = document.querySelector("#inputcards");
const sortSection = document.querySelector("#sortcards");
const drawbtn = document.querySelector("#draw-btn");
const sortbtn = document.querySelector("#sort-btn");
const input = document.querySelector("#inputnumber");

window.onload = function() {
  console.log("JM was Here!");

  let newDeck = [];

  drawbtn.addEventListener("click", event => {
    newDeck = getCards(event);
    sortSection.innerHTML = "";
  });

  sortbtn.addEventListener("click", event => {
    sortSection.innerHTML = "";
    selectionSort(newDeck);
  });
};

function getCards(event) {
  event.preventDefault();

  let deck = [];
  cardSection.innerHTML = "";

  for (let i = 0; i < input.value; i++) {
    let randomsuit = suits[Math.floor(Math.random() * suits.length)];
    let randomrank = ranks[Math.floor(Math.random() * ranks.length)];

    let objCard = {};
    objCard.suit = randomsuit;
    objCard.rank = randomrank;
    objCard.index = objCard.rank;

    if (objCard.rank == 1) {
      objCard.rank = "A";
    }
    if (objCard.rank == 11) {
      objCard.rank = "J";
    }
    if (objCard.rank == 12) {
      objCard.rank = "Q";
    }
    if (objCard.rank == 13) {
      objCard.rank = "K";
    }

    deck.push(objCard);

    paintCard(objCard, cardSection);
  }
  return deck;
}

function paintCard(objCard, section) {
  let divCard = document.createElement("div");
  let divRank = document.createElement("div");
  let divSuitTop = document.createElement("div");
  let divSuitBot = document.createElement("div");

  divRank.innerHTML = objCard.rank;
  divSuitTop.innerHTML = objCard.suit;
  divSuitBot.innerHTML = objCard.suit;

  divRank.style.color =
    objCard.suit === "♦" || objCard.suit === "♥" ? "red" : "black";
  divSuitTop.style.color =
    objCard.suit === "♦" || objCard.suit === "♥" ? "red" : "black";
  divSuitBot.style.color =
    objCard.suit === "♦" || objCard.suit === "♥" ? "red" : "black";

  divCard.classList.add("card");
  divRank.classList.add("rank");
  divSuitTop.classList.add("suit-top");
  divSuitBot.classList.add("suit-bot");

  section.append(divCard);
  divCard.append(divSuitTop, divRank, divSuitBot);
}

function selectionSort(newDeck) {
  let min = 0;
  while (min < newDeck.length - 1) {
    for (let i = min + 1; i < newDeck.length; i++) {
      if (parseInt(newDeck[min].index) > parseInt(newDeck[i].index)) {
        let temp = newDeck[min];
        newDeck[min] = newDeck[i];
        newDeck[i] = temp;
      }
    }
    let sortRow = document.createElement("div");
    sortRow.classList.add("col-md-12", "d-flex", "justify-content-center");
    sortSection.appendChild(sortRow);
    for (let i = 0; i < newDeck.length; i++) {
      paintCard(newDeck[i], sortRow);
    }
    min++;
  }
  return newDeck;
}
