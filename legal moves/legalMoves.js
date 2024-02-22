import {Rules} from '../rules/rules.js';
import {isUnderCheck} from '../rules/underTheCheck.js';
import {Board} from '../board/board.js';

// return the list of legal moves
class legalMoves {
    constructor(position, turn) {
        this.position = position;
        this.turn = turn;
        this.legalMoves = [];
        this.allMoves = [];
    }
    findMoves() {
        for (let rank of this.position) {
            // returns the piece of the current position
            for (let piece of rank) {
                if (piece.color == this.turn) {
                    if (piece.piece == 'pawn') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.pawnRule();
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
                    } else if (piece.piece == 'knight') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.knightRule();
                        for (let move of movesWithoutChecks) {
                            console.log(move);
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
                    } else if (piece.piece == 'king') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.kingRule();
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
                    }  else if (piece.piece == 'bishop') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.bishopRule();
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
                    } else if (piece.piece == 'rook') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.rookRule();
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
                    } else if (piece.piece == 'queen') {
                        let moves = new Rules(this.position, piece);
                        let movesWithoutChecks = moves.queenRule();
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
                    } 
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
                    if (piece.piece == 'pawn') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.pawnRule());
                        this.allMoves = this.allMoves.flat();    
                    } else if (piece.piece == 'knight') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.knightRule());
                        this.allMoves = this.allMoves.flat();
                    } else if (piece.piece == 'king') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.kingRule());
                        this.allMoves = this.allMoves.flat();
                    } else if (piece.piece == 'bishop') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.bishopRule());
                        this.allMoves = this.allMoves.flat();
                    } else if (piece.piece == 'rook') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.rookRule());
                        this.allMoves = this.allMoves.flat();
                    } else if (piece.piece == 'queen') {
                        let moves = new Rules(this.position, piece);
                        this.allMoves.push(moves.queenRule());
                        this.allMoves = this.allMoves.flat();
                    }
                }
            }
        }
        return this.allMoves;
    }
}


export {legalMoves};
// position: the current representation of the matrix board 
// turn: current turn of a player: 'black' || 'white'