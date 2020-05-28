"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const board_js_1 = __importDefault(require("./board.js"));
const readline_1 = __importDefault(require("readline"));
module.exports = class Game {
    constructor(player1, player2) {
        this.board = new board_js_1.default();
        this.players = [new player1("black", this.board), new player2("white", this.board)];
        this.curr = this.players[0];
        this.rlInterface = readline_1.default.createInterface({
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
    }
    ;
    /**
     * Creates a readline interface and starts the run loop.
     */
    play() {
        this.runLoop(() => {
            var _a;
            (_a = this.rlInterface) === null || _a === void 0 ? void 0 : _a.close();
            this.rlInterface = null;
        });
    }
    ;
    /**
     * Continues game play, switching turns, until the game is over.
     */
    runLoop(overCallback) {
        this._flipTurn();
        if (this.board.isOver()) {
            console.log("The game is over!");
            overCallback();
        }
        else if (!this.board.hasMove(this.curr.color)) {
            console.log(`${this.curr.color} has no move!`);
            this.runLoop(overCallback);
        }
        else {
            this.curr.playTurn(() => this.runLoop(overCallback), this.rlInterface);
        }
    }
    ;
};
