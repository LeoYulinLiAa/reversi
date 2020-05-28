import Piece from "./piece";
import type { Color, Vector2D } from "./@types/reversi";

export = class Board {

  grid: Array<Array<Piece | null>>;

  constructor() {
    this.grid = this._makeGrid();
  }

  /**
   * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
   * and two white pieces at [3, 3] and [4, 4]
   */
  _makeGrid() {
    const grid = Array.from(Array(8), () => new Array(8).fill(null));

    grid[3][4] = new Piece("black");
    grid[4][3] = new Piece("black");

    grid[3][3] = new Piece("white");
    grid[4][4] = new Piece("white");

    return grid;
  }

  /**
   * Checks if a given position is on the Board.
   */
  isValidPos([x, y]: Vector2D) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  /**
   * Returns the piece at a given [x, y] position,
   * throwing an Error if the position is invalid.
   */
  getPiece(pos: Vector2D) {
    if (!this.isValidPos(pos)) throw new Error("Invalid pos!");
    const [x, y] = pos;
    return this.grid[x][y];
  }

  /**
   * Checks if the piece at a given position
   * matches a given color.
   */
  isMine(pos: Vector2D, color: Color) {
    return this.getPiece(pos)?.color === color;
  };

  /**
   * Checks if a given position has a piece on it.
   */
  isOccupied(pos: Vector2D) {
    return !!this.getPiece(pos);
  };

  /**
   * Recursively follows a direction away from a starting position, adding each
   * piece of the opposite color until hitting another piece of the current color.
   * It then returns an array of all pieces between the starting position and
   * ending position.
   *
   * Returns an empty array if it reaches the end of the board before finding another piece
   * of the same color.
   *
   * Returns empty array if it hits an empty position.
   *
   * Returns empty array if no pieces of the opposite color are found.
   *
   */
  _positionsToFlip(pos: Vector2D, color: Color, dir: Vector2D, piecesToFlip: Vector2D[] = []): Vector2D[] {
    let [x, y] = pos;
    const [dx, dy] = dir;
    x += dx;
    y += dy;
    if (!this.isValidPos([x, y]) || !this.isOccupied([x, y])) return [];
    if (this.isMine([x, y], color)) return piecesToFlip;
    return this._positionsToFlip([x, y], color, dir, piecesToFlip.concat([[x, y]]));
  };

  /**
   * Checks that a position is not already occupied and that the color
   * taking the position will result in some pieces of the opposite
   * color being flipped.
   */
  validMove(pos: Vector2D, color: Color) {
    return !this.isOccupied(pos) && Board.DIRS.some(dir => {
      return this._positionsToFlip(pos, color, dir).length !== 0;
    });
  };

  /**
   * Adds a new piece of the given color to the given position, flipping the
   * color of any pieces that are eligible for flipping.
   *
   * Throws an error if the position represents an invalid move.
   */
  placePiece(pos: Vector2D, color: Color) {
    if (!this.validMove(pos, color)) throw new Error("Invalid move!");
    const [x, y] = pos;
    this.grid[x][y] = new Piece(color);
    Board.DIRS.forEach(dir => {
      this._positionsToFlip(pos, color, dir).forEach(pos => {
        this.getPiece(pos)!.flip();
      });
    });
  };

  /**
   * Produces an array of all valid positions on
   * the Board for a given color.
   * @returns {Array<[number, number]}
   */
  validMoves(color: Color): Vector2D[] {
    const res: Vector2D[] = [];

    for (let x = 0; x < 8; ++x) {
      for (let y = 0; y < 8; ++y) {
        if (this.validMove([x, y], color)) res.push([x, y]);
      }
    }

    return res;
  };

  /**
   * Checks if there are any valid moves for the given color.
   */
  hasMove(color: Color) {
    return this.validMoves(color).length !== 0;
  };


  /**
   * Checks if both the white player and
   * the black player are out of moves.
   */
  isOver() {
    return !this.hasMove("white") && !this.hasMove("black");
  };


  /**
   * Prints a string representation of the Board to the console.
   */
  print() {
    const str = this.grid.map(row => {
      return row.map(piece => {
        debugger;
        return (piece ? piece.toString() : "_");
      }).join(" ");
    }).join("\n");

    console.log(str);
  };

  static DIRS: Vector2D[] = [
    [0, 1], [1, 1], [1, 0],
    [1, -1], [0, -1], [-1, -1],
    [-1, 0], [-1, 1]
  ];

}