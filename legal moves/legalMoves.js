import {Rules} from '../rules/rules.js';
import {isUnderCheck} from '../rules/underTheCheck.js';
import {Board} from '../board/board.js';

// return the list of legal moves
export class legalMoves {
    constructor(position, turn) {
        this.position = position;
        this.turn = turn;
        this.legalMoves = [];
        this.allMoves = [];
    }

    addAllMoves(piece) {
        let moves = new Rules(this.position, piece);
        if (piece.piece == 'pawn') {
            this.allMoves.push(moves.pawnRule());
        } else if (piece.piece == 'knight') {
            this.allMoves.push(moves.knightRule());
        } else if (piece.piece == 'bishop') {
            this.allMoves.push(moves.bishopRule());
        } else if (piece.piece == 'queen') {
            this.allMoves.push(moves.queenRule());
        } else if (piece.piece == 'king') {
            this.allMoves.push(moves.kingRule());
        } else if (piece.piece == 'rook') {
            this.allMoves.push(moves.rookRule());
        } 
        this.allMoves = this.allMoves.flat();
    }

    addMoves(piece) {
        let moves = new Rules(this.position, piece);
        let movesWithoutChecks = null;
        if (piece.piece == 'pawn') {
            movesWithoutChecks = moves.pawnRule();
        } else if (piece.piece == 'knight') {
            movesWithoutChecks = moves.knightRule();
        } else if (piece.piece == 'bishop') {
            movesWithoutChecks = moves.bishopRule();
        } else if (piece.piece == 'queen') {
            movesWithoutChecks = moves.queenRule();
        } else if (piece.piece == 'king') {
            movesWithoutChecks = moves.kingRule();
        } else if (piece.piece == 'rook') {
            movesWithoutChecks = moves.rookRule();
        }
        for (let move of movesWithoutChecks) {
            let curPosition = [];
            for (let rank of this.position) {
                for (let piece of rank) {
                    if (piece != '#') {
                        curPosition.push(piece);
                    }
                }
            }
            let currentPosition = new Board(curPosition);
            let newPosition = currentPosition.updatePosition(move);
            let isKingChecked = new isUnderCheck(newPosition.matrix, this.turn);
            if (isKingChecked.countSquares().length == 0) {
                this.legalMoves.push(move);
            }
        }
        return;
    }

    findMoves() {
        for (let rank of this.position) {
            // returns the piece of the current position
            for (let piece of rank) {
                if (piece.color == this.turn) {
                    this.addMoves(piece);
                } 
            }
        }
        return this.legalMoves;
    }

    findAllMoves() {
        for (let rank of this.position) {
            // returns the piece of the current position
            for (let piece of rank) {
                if (piece.color == this.turn) {
                    this.addAllMoves(piece);
                }
            }
        }
        return this.allMoves;
    }
}

// position: the current representation of the matrix board 
// turn: current turn of a player: 'black' || 'white'