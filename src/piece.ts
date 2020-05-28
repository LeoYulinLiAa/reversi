import type { Color } from "./@types/reversi";

export = class Piece {

  color: Color;

  constructor(color: Color) {
    this.color = color;
  }

  /**
   * color opposite the current piece
   */
  oppColor() {
    return this.color == "white" ? "black" : "white"
  }

  /**
   * Changes the piece's color to the opposite color.
   */
  flip() {
    this.color = this.oppColor();
  }

  /**
   * Returns a string representation of the string
   * based on its color.
   */
  toString(): string {
    return this.color[0].toUpperCase();
  }
}
