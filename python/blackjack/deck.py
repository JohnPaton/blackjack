import random


class Card():
    """A playing card.

    Attributes:
        suit (str): the suit of the card
        value (int): the value of the card (2-11)
        str (str): the card, e.g. CK or H9

    """

    def __init__(self, suit, value):
        """Create a playing card.

        Args:
            suit (str): one of 'S','H','C','D'
            value (str or int): one of 2-10 or 'J','Q','K','A'
        """
        self.suit = suit
        self.str = str(suit) + str(value)
        try:
            val = int(value)
        except:
            if value in ['J', 'Q', 'K']:
                val = 10
            elif value == 'A':
                val = 11

        self.value = val

    def __str__(self):
        return self.str


class Deck():
    """A deck of cards.

    Attributes:
        cards (list): Cards to be drawn
        drawn (list): Cards that have been drawn

    Methods:
        shuffle: shuffle the cards
        draw: draw a card

    """

    suits = ['S', 'D', 'C', 'H']
    values = list(range(2, 11)) + ['J', 'Q', 'K', 'A']

    def __init__(self):
        self.cards = [Card(s, v) for v in self.values for s in self.suits]
        self.drawn = []

    def shuffle(self, reset=False):
        """Shuffle the cards.

        Reset all cards to be back in the pile if requested.
        """
        if reset:
            self.__init__()
        random.shuffle(self.cards)
        return self

    def draw(self):
        """Draw a card."""
        card = self.cards.pop(0)
        self.drawn.append(card)
        return card
