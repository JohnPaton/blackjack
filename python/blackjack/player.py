class Player():
    """A blackjack player.

    Attributes:
        cards (list): The current cards in the player's hand
        deck (Deck): The deck in play
        standing (bool): Whether the player has stood this round

    Methods:
        draw: draw a card
        reset: empty hand and stop standing
        score: score of the player's current cards
        turn: take a turn (hit or stand)

    """

    def __init__(self, deck):
        self.deck = deck
        self.cards = []
        self.standing = False

    def draw(self):
        """Draw a card into the player's hand."""
        card = self.deck.draw()
        self.cards.append(card)
        return card

    def score(self):
        """The score of the player's current hand."""
        if self.cards:
            values = [card.value for card in self.cards]
            total = sum(values)
        else:
            total = 0

        for value in values:
            # Aces (value 11) can be worth 1 if the score is above 21
            if value == 11 and total > 21:
                total -= 10

        return total

    def turn(self):
        """Take a turn (if not already standing)."""
        move = ''
        # can't take a turn if standing
        while move not in ['hit', 'h', 'stand', 's'] and not self.standing:
            move = input('(h)it or (s)tand? ').lower()

        if move in ['hit', 'h']:
            self.draw()
        else:
            self.standing = True

    def reset(self):
        """Return cards and stop standing."""
        self.cards = []
        self.standing = False


class Dealer(Player):
    """A blackjack dealer.

    Inherits from Player.

    Attributes:
        standing (bool): Whether the dealer is standing

    Methods:
        turn: hit if score is <= 16, else stand.

    """

    def turn(self):
        """Take a turn."""
        if self.score() <= 16 and not self.standing:
            self.draw()
        else:
            self.standing = True
