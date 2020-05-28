import Board from './board.js';

import readline from "readline";
import { Player } from './player';
import { Interface } from 'readline';
import type { Color } from './@types/reversi';

export = class Game {
  board: Board;
  players: Array<Player>
  curr: Player;
  rlInterface: Interface | null;

  constructor(
    player1: { new(color: Color, board: Board): Player },
    player2: { new(color: Color, board: Board): Player }
  ) {
    this.board = new Board();
    this.players = [new player1("black", this.board), new player2("white", this.board)];
    this.curr = this.players[0];

    this.rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  /**
   * Flips the current turn to the opposite color.
   */
  _flipTurn() {
    this.curr = (this.curr.color == "black") ? this.players[1] : this.players[0];
  };

  /**
   * Creates a readline interface and starts the run loop.
   */
  play() {
    this.runLoop(() => {
      this.rlInterface?.close();
      this.rlInterface = null;
    });
  };


  /**
   * Continues game play, switching turns, until the game is over.
   */
  runLoop(overCallback: () => void) {
    this._flipTurn();

    if (this.board.isOver()) {
      console.log("The game is over!");
      overCallback();
    } else if (!this.board.hasMove(this.curr.color)) {
      console.log(`${this.curr.color} has no move!`);
      this.runLoop(overCallback);
    } else {
      this.curr.playTurn(() => this.runLoop(overCallback), this.rlInterface);
    }
  };
}