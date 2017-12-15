from .deck import Deck
from .player import Player, Dealer


class Game():
    """A game of blackjack.

    Attributes:
        dealer (Dealer): The dealer
        deck (Deck): The deck
        player (Player): The player

    Methods:
        bust: return true if either player's score is over 21
        final_view: the view of all the cards on the table
        setup_players: initialize dealer and player with two cards each
        standing: true if both players are standing
        play: play a round using the deck, shuffling if necessary

    """

    init_cards = 2

    def __init__(self):
        self.deck = Deck().shuffle()
        self.setup_players()

    def setup_players(self):
        """Initialize dealer and player, draw two cards for each"""
        self.dealer = Dealer(self.deck)
        self.player = Player(self.deck)

        for i in range(self.init_cards):
            self.player.draw()
            self.dealer.draw()

    def __str__(self):
        # can only see dealer's first card
        dealer_view = [str(self.dealer.cards[0])]\
            + (len(self.dealer.cards)-1)*['??']
        player_view = [str(c) for c in self.player.cards]
        s = """
        Dealer: {}
        Player: {}
        """.format(' '.join(dealer_view),
                   ' '.join(player_view))

        return s

    def final_view(self):
        """View of all the cards."""
        dealer_view = [str(c) for c in self.dealer.cards]
        player_view = [str(c) for c in self.player.cards]
        s = """
        Dealer: {}
        Player: {}
        """.format(' '.join(dealer_view),
                   ' '.join(player_view))
        return s

    def bust(self):
        """True if either player is bust."""
        return self.player.score() > 21 or self.dealer.score() > 21

    def standing(self):
        """True if both players are standing."""
        return self.player.standing and self.dealer.standing

    def play(self):
        """Play a round of blackjack.

        The deck is shuffled when there are two cards left.

        Returns:
            str: the winner of the round ("Player" or "Dealer")
        """
        dealer = self.dealer
        player = self.player

        while not self.bust() and not self.standing():
            # show the table
            print(str(self))

            # shuffle if needs be
            if len(self.deck.cards) <= 2:
                self.deck.shuffle(reset=True)

            if not player.standing:  # no turn if already standing
                player.turn()

            if not self.bust():  # dealer turn if player isn't bust
                dealer.turn()

        print(self.final_view(), '\n')  # cards on the table
        print('Dealer score:', dealer.score())
        print('Player score:', player.score())

        if dealer.score() > 21:
            winner = 'Player'
        elif player.score() == 21 and len(player.cards) == 2:  # blackjack
            winner = 'Player'
        elif player.score() > dealer.score() and player.score() <= 21:
            winner = 'Player'
        else:
            winner = 'Dealer'

        print(winner, 'wins!')

        # reset the players
        if len(self.deck.cards) <= 4:
                self.deck.shuffle(reset=True)

        self.setup_players()

        return winner


def blackjack():
    """Play a simplified game of blackjack against the dealer."""
    print('Welcome to Blackjack!')

    # keep track of total games won
    player_score = 0
    dealer_score = 0

    response = ''
    game = Game()
    while response != 'n':  # default to play another round
        winner = game.play()

        # update scores
        if winner == 'Player':
            player_score += 1
        else:
            dealer_score += 1

        print()
        print('Totals: Player {}, Dealer {}'
              .format(player_score, dealer_score))

        response = input('Play again ([y]/n)? ').lower()

    print('See you next time!')
