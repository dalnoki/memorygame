let cards = document.querySelectorAll(".card");
let images = document.getElementsByTagName("img");
let shuffleButtton = document.querySelector(".shuffle");
let startButton = document.querySelector(".start-game");
let restartButton = document.querySelector(".restart-game");
let startTime = 0;
let finishTime = 0;
let totalGuesses = 0;
let startButtonPressed = 0;
let starNumber = 3;
let timer = new Timer();

/* function for alerting the player to hit start button */
function pleaseStartTheGame() {
    alert("Please click on the start button :)");
}

/*adding event listener to all .card elements that alerts the player to hit start button */
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", pleaseStartTheGame);
};

/* this controls everything that happens when user clicks on start button */
function startGame() {
    totalGuesses = 0;
    for (let i = 0; i < cards.length; i++) {
        cards[i].removeEventListener("click", pleaseStartTheGame);
    };
    startButtonPressed += 1;
    timer.start();
    timer.addEventListener('secondsUpdated', function(e) {
        $('#timer').html(timer.getTimeValues().toString());
    });
    if (startButtonPressed > 1) {
        totalGuesses = 0;
        timer.reset();
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove("found-card", "card-correct", "rubberBand");
            cards[i].classList.add("card");
            cards[i].style.backgroundColor = "#3A6EA5";
            cards[i].querySelector("img").style.display = "none";
        }
    }

    /* for loop to add event listener to all .card element */
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", cardClick);
        cards[i].addEventListener("click", function() {
            cards[i].classList.add("zoomIn");
            setTimeout(function() {
                cards[i].classList.remove("zoomIn");
            }, 500);
        }, false);
    }
}

/* this function is used in the shuffling process, this one sets the css order for the .card elements */
startButton.addEventListener("click", startGame);
function cssOrder() {
    for (let i = 0; i < cards.length; i++) {
        let randomNum = Math.floor(Math.random() * 25);
        cards[i].style.order = randomNum;
    }
}
cssOrder();

/* creates event listener for shuffle button to allow card shuffling */
shuffleButtton.addEventListener("click", function shuffleCSS() {
    for (let i = 0; i < cards.length; i++) {
        let randomNum = Math.floor(Math.random() * 25);
        cards[i].style.order = randomNum;
    }
});

/* this function here controls the display of the stars */
function starControl() {
    document.querySelector(".star3").style.display = "inline-block";
    document.querySelector(".star2").style.display = "inline-block";
    if (totalGuesses >= 36 && totalGuesses < 56) {
        document.querySelector(".star3").style.display = "none";
        starNumber = 2;
    } else if (totalGuesses >= 56) {
        document.querySelector(".star3").style.display = "none";
        document.querySelector(".star2").style.display = "none";
        starNumber = 1;
    }
}

/* this function is called when a .card element is clicked, this contains most of the game logic */
function cardClick() {
    totalGuesses += 1;
    if (this.classList.contains("found-card") === true) {
        this.classList.remove("found-card");
        this.querySelector('img').style.display = "none";
    } else {
        this.classList.add("found-card");
        this.querySelector('img').style.display = "block";
    }
    document.querySelector(".moves").innerHTML = totalGuesses;
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
    starControl();
};

/* this function checks if the two folded cards are pairs or not */
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
        if (firstImageNode[0].isEqualNode(secondImageNode[0])) {
            foundCardsClass[0].style.backgroundColor = "green";
            foundCardsClass[1].style.backgroundColor = "green";
            foundCardsClass[0].classList.remove("found-card", "card");
            foundCardsClass[1].classList.remove("found-card", "card");
            foundCardsClass[0].classList.add("card-correct", "rubberBand");
            foundCardsClass[1].classList.add("card-correct", "rubberBand");
            foundCardsClass[0].removeEventListener("click", cardClick);
            foundCardsClass[1].removeEventListener("click", cardClick);
        } else {
            function addTempClass() {
                foundCardsClass[0].classList.add("shake");
                foundCardsClass[1].classList.add("shake");
                setTimeout(function() {
                    foundCardsClass[0].classList.remove("shake");
                    foundCardsClass[1].classList.remove("shake");
                }, 1000);
            };
            addTempClass();
            foundCardsClass[0].classList.remove("found-card");
            foundCardsClass[0].classList.remove("found-card");
        }
    }
};

/* this function here checks if the game is won by the user or not, stops the timer and sets final data in modal */
function hasWon() {
    let foundCards = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].classList.contains("card-correct") === true) {
            foundCards += 1;
        }
        if (foundCards === 20) {
            restartButton.addEventListener("click", startGame);
            let time = timer.getTimeValues().toString();
            timer.stop();
            $('#winnerModal').modal('show');
            document.getElementById("you-won").innerHTML =
                `This game lasted for ${time} seconds - and it took ${totalGuesses} steps to complete :)
                You received ${starNumber} stars! Yaay!`;
        }
    }
};
