"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messagees_1 = require("./messagees");
class Game {
    constructor(player1, player2) {
        this.movecount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messagees_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: messagees_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        if (this.movecount % 2 === 0 && socket !== this.player1) {
            // It's player 2's turn, but this isn't player 2's socket, so do nothing
            return;
        }
        if (this.movecount % 2 === 1 && socket !== this.player2) {
            // It's player 1's turn, but this isn't player 1's socket, so do nothing
            return;
        }
        try {
            // Attempt to make the move
            this.board.move(move);
        }
        catch (e) {
            // If the move is invalid (and therefore throws an error), do nothing
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            // If the game is over, send a game over message to both players
            return;
        }
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: 'GAME OVER',
                payload: { winner: this.board.turn() === 'w' ? "black" : "white" }
            }));
            return;
        }
        if (this.movecount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: messagees_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: messagees_1.MOVE,
                payload: move
            }));
        }
        this.movecount++;
    }
}
exports.Game = Game;
