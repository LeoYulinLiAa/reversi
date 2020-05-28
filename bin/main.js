const Game = require("../lib/game");
const HumanPlayer = require("../lib/humanPlayer.js");
const AIPlayer = require("../lib/aiPlayer.js");

const game = new Game(AIPlayer, AIPlayer);
game.play();