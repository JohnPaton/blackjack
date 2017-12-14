// Util functions

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
            var val = this.name.split('-')[0];

            if (tens.indexOf(val) >= 0) {
                return 10;
            } else if (val === 'ace') {
                return 11;
            } else {
                return +val;
            }
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
            name = values[j] + '-of-' + suits[i];
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
function Player(deck) {
    var player = {
        deck: deck,
        cards: [],
        standing: false,

        reset: function() {
            this.cards = [];
            this.standing = False;
        },

        hit: function() {
            if (!this.standing){
                this.cards.push(this.deck.draw());
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
                console.log('pushed score')
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

function Dealer(deck) {
    var dealer = Player(deck);

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
        player: Player(deck),
        dealer: Dealer(deck),

        init: function() {
            this.deck.shuffle();
            this.player.hit();
            this.dealer.hit();
            this.player.hit();
            this.dealer.hit();
            return this;
        },

        bust: function() {
            return (this.player.score() > 21) | (this.dealer.score() > 21);
        },

        standing: function() {
            return this.player.standing & this.dealer.standing
        },

        playRound: function() {
            "TODO";
        }
    };

    return game.init();
}


