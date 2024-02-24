import {squareAttacked} from '../rules/squareAttacked.js';
import {isSquareEmpty} from '../rules/isSquareEmpty.js';

export class longCastle {
    constructor(position, moves, turn) {
        this.position = position;
        this.moves = moves;
        this.turn = turn;
        this.kingMoved = this.longSideKingMoved();
        this.rookMoved = this.longSideRookMoved();
    }

    canCastleD() {
        if (this.kingMoved == true || this.rookMoved == true) {
            return false;
        }
        
        if (this.turn == 'white') {
            let squareAttackInit = new squareAttacked(this.position, 'black');
            if (squareAttackInit.isAttacked('d1') == false && squareAttackInit.isAttacked('c1') == false && isSquareEmpty('d1', this.position) == true && isSquareEmpty('c1', this.position) == true && isSquareEmpty('b1', this.position) == true) {
                return true;
            } else {
                return false;
            }
        } else if (this.turn == 'black') {
            let squareAttackInit = new squareAttacked(this.position, 'white');
            if (squareAttackInit.isAttacked('d8') == false && squareAttackInit.isAttacked('c8') == false && isSquareEmpty('d8', this.position) == true && isSquareEmpty('c8', this.position) == true && isSquareEmpty('b8', this.position) == true) {
                return true;
            } else {
                return false;
            }
        } 
    }

    // returns true if the a1 rook has moved or if the a8 rook has moved
    longSideRookMoved() {
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
                        if (move.from == 'a8' && move.color == 'black') {
                            return true;
                        }
                        continue;
                    } else if (this.turn == 'white') {
                        if (move.from == 'a1' && move.color == 'white') {
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

    longSideKingMoved() {
        for (let currentMove of this.moves) {
            let count = 0;
            for (let move of currentMove) {
                if (move == '0-0-0' || move == '0-0') {
                    if (this.turn = 'white' && count == 0) {
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