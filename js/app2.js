let cards = document.querySelectorAll(".card");
let images = document.getElementsByTagName("img");
let shuffleButtton = document.querySelector(".shuffle");
let totalGuesses = 0;

/* for loop to add event listener to all .card element */
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", cardClick);
}

/* this function is used in the shuffling process, this one sets the css order fot the .card elements */
function cssOrder () {
  for (let i = 0; i < cards.length; i++) {
    let randomNum = Math.floor(Math.random()* 25);
    cards[i].style.order = randomNum;
  }

}

/* creates event listener for shuffle button to allow card shuffling */
shuffleButtton.addEventListener("click", function shuffleCSS() {
  for (let i = 0; i < cards.length; i++) {
    let randomNum = Math.floor(Math.random()* 25);
    cards[i].style.order = randomNum;
  }

});

/* this function is called when a .card element is clicked, this contains most of the game logic */
function cardClick () {

  totalGuesses += 1;

/*  if (totalGuesses = 1) {
    let timer = new Date();
  }

/*  document.getElementsByClassName('moves').innerHTML = totalGuesses + "moves"; */




if (this.classList.contains("found-card") === true) {
  this.classList.remove("found-card");
  this.querySelector('img').style.display = "none";
} else {
  this.classList.add("found-card");
  this.querySelector('img').style.display = "block";

}

console.log(totalGuesses);

if (totalGuesses % 2 === 1 && totalGuesses != 1) {

  for (let i = 0; i < cards.length; i++) {
   cards[i].classList.remove("found-card");
}

for (let i = 0; i < images.length; i++) {
  if (cards[i].classList.contains("card-correct") === false) {
        images[i].style.display = "none";
}

}
};

this.classList.add("found-card");

this.querySelector('img').style.display = "block";
isPair();
hasWon();

};


function isPair() {
  let howManyCardsAreUp = 0;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("found-card") === true) {
       howManyCardsAreUp += 1;
    }
}
    if (howManyCardsAreUp > 1) {
        let foundCardsClass = document.querySelectorAll(".found-card");

        let firstImageNode = foundCardsClass[0].childNodes;
        let secondImageNode = foundCardsClass[1].childNodes;

        if (firstImageNode[1].isEqualNode(secondImageNode[1])) {
          foundCardsClass[0].style.backgroundColor = "green";
          foundCardsClass[1].style.backgroundColor = "green";
          foundCardsClass[0].classList.remove("found-card","card");
          foundCardsClass[1].classList.remove("found-card","card");
          foundCardsClass[0].classList.add("card-correct");
          foundCardsClass[1].classList.add("card-correct");

        foundCardsClass[0].removeEventListener("click", cardClick);
        foundCardsClass[1].removeEventListener("click", cardClick);

      } else {

        foundCardsClass[0].classList.remove("found-card");
        foundCardsClass[0].classList.remove("found-card");


      }
}
}

/* this function here checks if the game is won by the user or not */
function hasWon () {
  let foundCards = 0;

  for (let i = 0; i < cards.length; i++) {
    if (cards[i].classList.contains("card-correct") === true) {
       foundCards += 1;
    }

    if (foundCards === 20) {
      $('#winnerModal').modal('show');
    }

}
};
