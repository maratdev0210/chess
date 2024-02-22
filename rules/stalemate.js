import {legalMoves} from '../legal moves/legalMoves.js';

class Stalemate {
    constructor(position, turn) {
        this.position = position;
        this.turn = turn;
        this.king = null; // find the position of the current player's king
        for (let rank of this.position) {
            for (let piece of rank) {
                if (piece != '#' && piece.piece == 'king' && piece.color == this.turn) {
                    this.king = piece;
                }
            }
        }
        this.oppositeMoves = [];
        this.attacking = [];
    }

    findOpposite() {
        for (let rank of this.position) {
            for (let piece of rank) {
                if (piece == '#' || piece.color == this.turn) {
                    continue;
                }
                let moves = new legalMoves(this.position, piece.color);
                this.oppositeMoves = moves.findAllMoves();
            }
        }
        return this.oppositeMoves;
    }

    isStalemate() {
        // find all the opposite moves
        this.oppositeMoves = this.findOpposite();
        for (let piece of this.oppositeMoves) {
            if (piece.to == this.king.position) {
                this.attacking.push(piece);
            }
        }
        if (this.attacking.length == 0) {
            return true;
        }
        return false;
    }
}

// the position if stalemated if under the current position the king is not under the check
export {Stalemate};