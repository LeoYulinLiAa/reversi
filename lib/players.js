"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIPlayer = exports.HumanPlayer = exports.Player = void 0;
const board_1 = require("./board");
class Player {
    constructor(color, board) {
        this.color = color;
        this.board = board;
    }
}
exports.Player = Player;
class HumanPlayer extends Player {
    playTurn(callback, rlInterface) {
        this.board.print();
        rlInterface === null || rlInterface === void 0 ? void 0 : rlInterface.question(`${this.color}, where do you want to move?`, handleResponse.bind(this));
        function handleResponse(answer) {
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
exports.HumanPlayer = HumanPlayer;
class AIPlayer extends Player {
    playTurn(callback) {
        this.board.print();
        let { pos } = this.board.validMoves(this.color).map(pos => {
            const len = board_1.Board.DIRS.reduce((sum, dir) => {
                return this.board._positionsToFlip(pos, this.color, dir).length + sum;
            }, 0);
            return { pos, len };
        }).reduce(({ pos: maxPos, len: maxLen }, { pos, len }) => {
            if (len > maxLen) {
                return { pos, len };
            }
            else {
                return { pos: maxPos, len: maxLen };
            }
        });
        this.board.placePiece(pos, this.color);
        console.log(`Computer ${this.color} played (${pos[0]}, ${pos[1]})`);
        callback();
    }
}
exports.AIPlayer = AIPlayer;
