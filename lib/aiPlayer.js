"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const board_1 = __importDefault(require("./board"));
const player_1 = require("./player");
module.exports = class AIPlayer extends player_1.Player {
    playTurn(callback) {
        this.board.print();
        let { pos } = this.board.validMoves(this.color).map(pos => {
            const len = board_1.default.DIRS.reduce((sum, dir) => {
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
};
