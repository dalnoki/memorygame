let cards = document.querySelectorAll(".card");
let images = document.getElementsByTagName("img");
let shuffleButtton = document.querySelector(".btn");
let totalGuesses = 0;

/* for loop to add event listener to all .card element */
for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", cardClick);
}

/* creates event listener for shuffle button to allow card shuffling */
shuffleButtton.addEventListener("click", function shuffleCSS() {
  for (let i = 0; i < cards.length; i++) {
    let randomNum = Math.floor(Math.random()* 25);
    cards[i].style.order = randomNum;
  }

});


function cardsAreUp() {
        let foundCardsClass = document.querySelectorAll(".found-card");

        let firstImageNode = foundCardsClass[0].childNodes;
        let secondImageNode = foundCardsClass[1].childNodes;

        if (firstImageNode[1].isEqualNode(secondImageNode[1])) {
          foundCardsClass[0].style.backgroundColor = "green";
          foundCardsClass[1].style.backgroundColor = "green";
          foundCardsClass[0].classList.remove("found-card");
          foundCardsClass[1].classList.remove("found-card");
        foundCardsClass[0].removeEventListener("click", cardClick);
        foundCardsClass[1].removeEventListener("click", cardClick);

      } else {
        foundCardsClass[0].style.backgroundColor = "red";
        foundCardsClass[1].style.backgroundColor = "red";
        foundCardsClass[0].classList.remove("found-card");
        foundCardsClass[0].classList.remove("found-card");

      }

}







/*function isPair() {




      if (firstDiv.className == secondDiv.className) {
          firstDiv.style.backgroundColor = "green";
          secondDiv.style.backgroundColor = "green";
        firstDiv.removeEventListener("click", cardClick);
        secondDiv.removeEventListener("click", cardClick);
        cardsUp.length = 0;
        console.log(cardsUp);
        console.log("the length of the cardup arr is" + cardsUp.length);


      } else {
        firstDiv.style.backgroundColor = "red";
          secondDiv.style.backgroundColor = "red";
            cardsUp.length = 0;
            console.log(cardsUp);
            console.log("the length of the cardup arr is" + cardsUp.length);



      }

    }
  };
*/

function isPair() {
   if (foundCards.length === 2) {

   }
}





/* this function is used in the .card for loop, this is responsible for everything card-turning related */
function cardClick () {

  totalGuesses += 1;


if (this.classList.contains("found-card") === true) {

/*  this.classList.remove("rotateIn","rotateInRight"); */
  this.classList.remove("found-card");
  this.querySelector('img').style.display = "none";
/*  this.classList.add("rotateIn"); */

} else {
  /*this.classList.remove("rotateIn"); */
  this.classList.add("found-card");
  this.querySelector('img').style.display = "block";
/*  this.classList.add("rotateInRight"); */

}

if (totalGuesses % 2 === 0) {

  cardsAreUp();

} else {
    console.log(totalGuesses);
}
};

/* this function is used in the shuffling process, this one sets the css order fot the .card elements */
function cssOrder () {
  for (let i = 0; i < cards.length; i++) {
    let randomNum = Math.floor(Math.random()* 25);
    cards[i].style.order = randomNum;
  }

}
