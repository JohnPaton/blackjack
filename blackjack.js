// Options

var cardRoot = '/resources',
    cardFronts = cardRoot + '/playing-cards-assets/svg-cards',
    cardBack = cardRoot + 'playing-card-back.svg';

var playerCards = document.getElementById('playerCards'),
    dealerCards = document.getElementById('dealerCards');

// Util functions
function clearContents(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    };
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, 
        temporaryValue, 
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
        }

    return array;
    }

// Card & Deck functions
function Card(name) {
    var card = {
        name: name,
        value: function () {
            var tens = ['jack', 'queen', 'king'];
            var val = this.name.split('_')[0];

            if (tens.indexOf(val) >= 0) {
                return 10;
            } else if (val === 'ace') {
                return 11;
            } else {
                return +val;
            }
        },

        display: function(element) {
            var filePath = cardFronts+'/'+this.name+'.svg';
            var img = document.createElement('img');

            img.setAttribute('src', filePath);
            img.setAttribute('class', 'card');

            element.appendChild(img);
        }
    };
    return card;
}

function Deck() {
    var suits = ['spades', 'hearts', 'clubs', 'diamonds'],
        values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 
                  'jack', 'queen', 'king', 'ace'];

    var cards = [];
    var name;

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < values.length; j++) {
            name = values[j] + '_of_' + suits[i];
            cards.push(Card(name));
        }
    }

    var deck = {
        cards: cards,
        drawn: [],

        shuffle: function(){
            this.cards = this.cards.concat(this.drawn);
            this.drawn = [];
            shuffle(this.cards); 
            console.log("Deck shuffled");
            return this;
        },

        draw: function(){
            var card = this.cards.pop();
            this.drawn.push(card);
            return card;
        }
    };
    return deck;
}

// Player functions
function Player(deck, element) {
    var player = {
        deck: deck,
        cards: [],
        standing: false,
        element: element,

        reset: function() {
            this.cards = [];
            this.standing = false;
        },

        hit: function() {
            if (!this.standing){
                var card = this.deck.draw();
                card.display(this.element)
                this.cards.push(card);
            }
        },

        stand: function() {
            this.standing = true;
        },

        score: function() {
            var score, 
                scores = [], 
                total = 0;

            for (var i = 0; i < this.cards.length; i++) {
                score = this.cards[i].value()
                total = total + score;
                scores.push(score);
            }

            for (var i = 0; i < scores.length; i++) {
                score = scores[i];
                if ((total > 21) & (score == 11)) {
                    total = total - 10;
                }
            }
            return total;
        }
    };
    return player;
}

function Dealer(deck, element) {
    var dealer = Player(deck, element);

    dealer.turn = function() {
        if (this.score() <= 16){
            this.hit();
        } else {
            this.stand();
        }
    };
    return dealer;
}

// Game functions
function Game() {
    var deck = Deck();
    var game = {
        deck: deck,
        player: Player(deck, playerCards),
        dealer: Dealer(deck, dealerCards),

        init: function() {
            this.deck.shuffle();
            this.setupPlayers();
            return this;
        },

        setupPlayers: function() {
            this.shuffleIfNeeded(4);
            this.player.reset();
            this.dealer.reset();
            this.player.hit();
            this.dealer.hit();
            this.player.hit();
            this.dealer.hit();
        },

        bust: function() {
            return (this.player.score() > 21) | (this.dealer.score() > 21);
        },

        standing: function() {
            return this.player.standing & this.dealer.standing;
        },

        inProgress: function() {
            return !this.bust() & !this.standing();
        },
        shuffleIfNeeded: function(minCards) {
            if (this.deck.cards.length <= minCards){
                this.deck.shuffle();
            }
        },

        turn: function(action) {
            this.shuffleIfNeeded(2);
            if (action == 'hit') {
                this.player.hit();
                if (this.inProgress()){
                    this.dealer.turn();
                }
            } else {
                this.player.stand();
                while (this.inProgress()) {
                    this.dealer.turn();
                }
            };

            // TODO: Think about how to do this wrt player interaction
        }
    };
    return game.init();
}


// Button functions

function action1(){
    if (game.inProgress()){
        game.turn('hit');
    } else {
        clearContents(dealerCards);
        clearContents(playerCards);
        game.setupPlayers();
        button1.innerHTML = "Hit";
        button2.innerHTML = "Stand";
        button2.style.visibility = 'visible';
    }

    if (!game.inProgress()) {
        button1.innerHTML = "Play again?"
        button2.style.visibility = 'hidden';
    }
}

function action2() {
    if (game.inProgress()){
        game.turn('stand');
    };

    button1.innerHTML = "Play again?"
    button2.style.visibility = 'hidden';
}

var game = Game(),
    player = game.player,
    dealer = game.dealer;

var button1 = document.getElementById('action1'),
    button2 = document.getElementById('action2');

button1.onclick = action1;
button2.onclick = action2;
