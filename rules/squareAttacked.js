import {legalMoves} from '../legal moves/legalMoves.js';

// check if the square is attacked by the pieces
class squareAttacked {
    constructor(position, turn) {
        this.position = position;
        this.turn = turn;
        this.moves = [];
        let possibleMoves = new legalMoves(this.position, this.turn);
        this.moves = possibleMoves.findAllMoves();
    }

    isAttacked(square) {
        for (let move of this.moves) {
            if (move.to == square) {
                return true;
            }
        }
        return false;
    }
}

export {squareAttacked};