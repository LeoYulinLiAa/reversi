import  Board  from './board';
import { Player } from './player';

export = class AIPlayer extends Player {
  playTurn(callback: () => void): void {
    this.board.print();

    let { pos } = this.board.validMoves(this.color).map(pos => {
      const len = Board.DIRS.reduce((sum, dir) => {
        return this.board._positionsToFlip(pos, this.color, dir).length + sum;
      }, 0);

      return {pos, len};
    }).reduce(({pos: maxPos, len: maxLen}, {pos, len}) => {
      if (len > maxLen) {
        return {pos, len};
      } else {
        return { pos: maxPos, len: maxLen };
      }
    });

    this.board.placePiece(pos, this.color);
    console.log(`Computer ${this.color} played (${pos[0]}, ${pos[1]})`);
    callback();
  }

}