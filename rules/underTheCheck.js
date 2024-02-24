import {Rules} from '../rules/rules.js';
import {legalMoves} from '../legal moves/legalMoves.js';

// class that checks whether the king is under the check or not
export class isUnderCheck {
    constructor(position, turn) {
        this.position = position;
        this.turn = turn;
        this.king = null;
        this.oppositeMoves = [];       // store the list of all possible moves of the opposite color
        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 8; j += 1) {
                if (this.position[i][j].piece == 'king' && this.position[i][j].color == turn) {
                    this.king = this.position[i][j].position;
                    break;
                } 
            }
        }
        this.rank = parseInt(this.king[1]) - 1;
        this.letter = this.king[0].charCodeAt(0) - 97;
        this.attacking = [];
    }
    // finds all the possible moves that can be made by the opposite pieces
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
    // count the number of positions by opposite color and match it against the position of the king
    countSquares() {
        this.oppositeMoves = this.findOpposite();
        for (let piece of this.oppositeMoves) {
            if (piece.to == this.king) {
                this.attacking.push(piece);
            }
        }
        return this.attacking;
    }
}



// The algorithm for running
// for all the pieces of the opposite colors find all the possible moves that can be made by each piece.
// using the Rules class