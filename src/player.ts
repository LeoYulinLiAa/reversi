import Board from './board';
import { Interface } from 'readline';
import type { Color } from './@types/reversi';

export abstract class Player {
  readonly color: Color;
  readonly board: Board;

  constructor(color: Color, board: Board) {
    this.color = color;
    this.board = board;
  }

  abstract playTurn(callback: () => void, rlInterface: Interface | null): void;
}
