import { WebSocket } from "ws";
import { Chess } from "chess.js";
import { INIT_GAME, MOVE, GAME_OVER } from "./messagees"; // Fixed import typo: messagees -> messages

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  public board: Chess;
  private startTime: Date;
  private movecount = 0;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: "white"
      }
    }));

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: {
        color: "black"
      }
    }));
  }

  makeMove(socket: WebSocket, move: { from: string; to: string }) {
    // Determine the current player's turn
    const isPlayer1Turn = this.movecount % 2 === 0;

    // Check if it's the correct player's turn
    if ((isPlayer1Turn && socket !== this.player1) || (!isPlayer1Turn && socket !== this.player2)) {
      // It's not the correct player's turn, so do nothing
      return;
    }

    // Attempt to make the move
    const moveResult = this.board.move(move);

    if (moveResult === null) {
      // If the move is invalid (returns null), do nothing
      console.log("Invalid move attempted:", move);
      return;
    }

    // Move was successful, increment the move count
    this.movecount++;

    // Check if the game is over
    if (this.board.isGameOver()) {
      // Send a game over message to both players
      const winner = this.board.turn() === 'w' ? "black" : "white";
      const gameOverMessage = JSON.stringify({
        type: GAME_OVER,
        payload: { winner }
      });
      this.player1.send(gameOverMessage);
      this.player2.send(gameOverMessage);
      return;
    }

    // Send the move to the opponent player
    const moveMessage = JSON.stringify({
      type: MOVE,
      payload: move
    });

    if (isPlayer1Turn) {
      this.player2.send(moveMessage);
    } else {
      this.player1.send(moveMessage);
    }
  }
}
