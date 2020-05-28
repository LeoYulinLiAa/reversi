"use strict";
const player_1 = require("./player");
module.exports = class HumanPlayer extends player_1.Player {
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
};
