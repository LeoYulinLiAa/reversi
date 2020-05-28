import { Interface } from "readline";
import { Player } from './player';

export = class HumanPlayer extends Player {
  playTurn(callback: () => void, rlInterface: Interface | null): void {
    this.board.print();

    rlInterface?.question(
      `${this.color}, where do you want to move?`,
      handleResponse.bind(this)
    );

    function handleResponse(this: HumanPlayer, answer: string) {
      const pos = JSON.parse(answer);
      if (!this.board.validMove(pos, this.color)) {
        console.log("Invalid move!");
        this.playTurn(callback, rlInterface);
        return;
      }

      this.board.placePiece(pos, this.color);
      callback();
    }
  }

}