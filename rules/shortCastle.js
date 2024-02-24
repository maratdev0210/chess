import {squareAttacked} from '../rules/squareAttacked.js';
import {isSquareEmpty} from '../rules/isSquareEmpty.js';

export class shortCastle {
    constructor(position, moves, turn) {
        this.position = position;
        this.moves = moves;
        this.turn = turn;
        this.kingMoved = this.shortSideKingMoved();
        this.rookMoved = this.shortSideRookMoved();
    }

    canCastle() {
        console.log(this.kingMoved);
        console.log(this.rookMoved);
        console.log(this.turn);
        if (this.kingMoved == true || this.rookMoved == true) {
            return false;
        }
        if (this.turn == 'white') {
            let squareAttackInit = new squareAttacked(this.position, 'black');
            if (squareAttackInit.isAttacked('f1') == false && squareAttackInit.isAttacked('g1') == false && isSquareEmpty('f1', this.position) == true && isSquareEmpty('g1', this.position) == true) {
                return true;
            } else {
                return false;
            }
        } else if (this.turn == 'black') {
            let squareAttackInit = new squareAttacked(this.position, 'white');
            if (squareAttackInit.isAttacked('f8') == false && squareAttackInit.isAttacked('g8') == false && isSquareEmpty('f8', this.position) == true && isSquareEmpty('g8', this.position) == true) {
                return true;
            } else {
                return false;
            }
        } 
    }   

    // returns true if the h1 rook has moved or if the h8 rook has moved
    shortSideRookMoved() {
        for (let currentMove of this.moves) {
            let count = 0;
            for (let move of currentMove) {
                if (move == '0-0-0' || move == '0-0') {
                    if (this.turn == 'white' && count == 0) {
                        return true;
                    } else if (this.turn == 'black' && count == 1) {
                        return true;
                    }
                }
                else if (move.piece == 'rook') {
                    count += 1;
                    if (this.turn == 'black') {
                        if (move.from == 'h8' && move.color == 'black') {
                            return true;
                        }
                        continue;
                    } else if (this.turn == 'white') {
                        if (move.from == 'h1' && move.color == 'white') {
                            return true;
                        }
                        continue;
                    }
                }
                count += 1;
            }
        }
        return false;
    }

    shortSideKingMoved() {
        for (let currentMove of this.moves) {
            let count = 0;
            for (let move of currentMove) {
                if (move == '0-0-0' || move == '0-0') {
                    if (this.turn == 'white' && count == 0) {
                        return true;
                    } else if (this.turn == 'black' && count == 1) {
                        return true;
                    }
                }
                else if (move.piece == 'king') {
                    count += 1;
                    if (this.turn == 'black') {
                        if (move.from == 'e8' && move.color == 'black') {
                            return true;
                        }
                        continue;
                    } else if (this.turn == 'white') {
                        if (move.from == 'e1' && move.color == 'white') {
                            return true;
                        }
                        continue;
                    }
                }
                count += 1;
            }
        }
        return false;
    }
}