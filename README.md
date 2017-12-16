## Learning JavaScript syntax with Blackjack

A simplified version of Blackjack to teach myself a bit of JavaScript syntax. No betting or splitting, only hitting or standing, 1v1 against the dealer. 

To try the game, head over to [johnpaton.net/blackjack](https://johnpaton.net/blackjack/). 

If you prefer to run it locally, clone this directory and then serve the page locally using the following commands:

```bash
git clone https://github.com/JohnPaton/blackjack
cd blackjack
python3 -m http.server 8080
```

Now navigate with your browser to [http://localhost:8080/](http://localhost:8080/) to play! Hit `ctrl-c` to kill the server when you're done.

The `python` directory contains a Python module providing the same gameplay as a cli. I did this quickly for my own reference, so that the logic would be mapped out and I could focus on thinking about the syntax of a new language. After cloning the repo, you can try it yourself with:

```bash
cd blackjack/python
python3 -m blackjack
```

Have fun!
