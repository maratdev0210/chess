import {createCoords} from '../rules/coordinates.js';
import {checkBounds} from '../rules/checkBounds.js';
import {toSquare} from '../rules/toSquare.js';

// add the rules to the game
// the position is the matrix representation of the board
export class Rules {
    constructor(position, piece) {
        this.position = position;
        this.piece = piece;
        this.moves = [];         // an array of objects: {from: initial position, to: final position, piece: type of the piece}
        this.letter = this.piece.position[0].charCodeAt(0) - 97;      // make the values of letter and rank to be zero-based
        this.rank = parseInt(this.piece.position[1]) - 1;     
        this.coords = createCoords();
    }

    pawnRule() {
        if (this.piece.color == 'white') {
            if (this.rank + 1 == 2) {
                // if the pawn is on the second rank it can move either one square up or two squares up
                for (let i = 1; i <= 2; i += 1) {
                    if (this.position[this.rank + i][this.letter] == '#') {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: this.piece.position[0] + String(this.rank + i + 1),
                                piece: 'pawn', 
                                color: this.piece.color
                            }
                        );
                    } else {
                        break;
                    }
                }
            } else {
                if (this.position[this.rank + 1][this.letter] == '#') {
                    this.moves.push(
                        {
                            from: this.piece.position,
                            to: this.piece.position[0] + String(this.rank + 2),
                            piece: 'pawn',
                            color: this.piece.color,
                        }
                    );
                }
            }
            // capturing the other pieces
            if (this.letter == 0) {
                // if the pawn is on a-file
                if (this.position[this.rank + 1][this.letter + 1] != '#' && this.position[this.rank + 1][this.letter + 1].color != this.piece.color) {
                    this.moves.push({
                        from: this.piece.position,
                        to: 'b' + String(this.rank + 2),
                        piece: 'pawn',
                        color: this.piece.color,
                    });
                }
            } else if (this.letter == 7) {
                // if the pawn is on h-file 
                if (this.position[this.rank + 1][this.letter - 1] != '#' && this.position[this.rank + 1][this.letter - 1].color != this.piece.color) {
                    this.moves.push({
                        from: this.piece.position, 
                        to: 'g' + String(this.rank + 2),
                        piece: 'pawn',
                        color: this.piece.color,
                    });
                }
            } else {
                // if the pawn is between b-file and g-file 
                for (let i = -1; i <= 1; i += 2) {
                    if (this.position[this.rank + 1][this.letter + i] != '#' && this.position[this.rank + 1][this.letter + i].color != this.piece.color) {
                        this.moves.push({
                            from: this.piece.position, 
                            to: String.fromCharCode(97 + this.letter + i) + String(this.rank + 2),
                            piece: 'pawn',
                            color: this.piece.color,
                        });
                    }
                }
            }
        } else {
            if (this.rank + 1 == 7) {
                // if the pawn is on the 7th rank it can move either one square down or two squares down
                for (let i = 1; i <= 2; i += 1) {
                    if (this.position[this.rank - i][this.letter] == '#') {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: this.piece.position[0] + String(this.rank - i + 1),
                                piece: 'pawn',
                                color: this.piece.color,
                            }
                        );
                    } else {
                        break;
                    }
                }
            } else {
                if (this.position[this.rank - 1][this.letter] == '#') {
                    this.moves.push(
                        {
                            from: this.piece.position, 
                            to: this.piece.position[0] + String(this.rank),
                            piece: 'pawn',
                            color: this.piece.color,
                        }
                    );
                }
            }
            if (this.letter == 0) {
                // if the pawn is on a-file
                if (this.position[this.rank - 1][this.letter + 1] != '#' && this.position[this.rank - 1][this.letter + 1].color != this.piece.color) {
                    this.moves.push({
                        from: this.piece.position,
                        to: 'b' + String(this.rank),
                        piece: 'pawn',
                        color: this.piece.color,
                    });
                }
            } else if (this.letter == 7) {
                // if the pawn is on h-file 
                if (this.position[this.rank - 1][this.letter - 1] != '#' && this.position[this.rank - 1][this.letter - 1].color != this.piece.color) {
                    this.moves.push({
                        from: this.piece.position, 
                        to: 'g' + String(this.rank),
                        piece: 'pawn',
                        color: this.piece.color,
                    });
                }
            } else {
                // if the pawn is between b-file and g-file 
                for (let i = -1; i <= 1; i += 2) {
                    if (this.position[this.rank - 1][this.letter + i] != '#' && this.position[this.rank - 1][this.letter + i].color != this.piece.color) {
                        this.moves.push({
                            from: this.piece.position, 
                            to: String.fromCharCode(97 + this.letter + i) + String(this.rank),
                            piece: 'pawn',
                            color: this.piece.color,
                        });
                    }
                }
            }
        }
        return this.moves;
    }

    rookRule() {
        for (let i = 4; i < 8; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (checkBounds(this.coords, this.rank, this.letter, i, j)) {
                    if (this.placePiece(i, j, this.piece) != 0) {
                        this.moves.push(this.createMove(i, j, 'rook'));
                    }
                    if (this.placePiece(i, j, this.piece) == 1) {
                        continue; 
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    bishopRule() {
        for (let i = 0; i < 4; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (checkBounds(this.coords, this.rank, this.letter, i, j)) {
                    if (this.placePiece(i, j, this.piece) != 0) {
                        this.moves.push(this.createMove(i, j, 'bishop'));
                    }
                    if (this.placePiece(i, j, this.piece) == 1) {
                        continue; 
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    knightRule() {
        for (let i = 16; i < 24; i += 1) {
            if (checkBounds(this.coords, this.rank, this.letter, i, null)) {
                if (this.placePiece(i, null, this.piece) != 0) {
                    this.moves.push(this.createMove(i, null, 'knight'));
                } 
            }
        }
        return this.moves;
    }

    queenRule() {
        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (checkBounds(this.coords, this.rank, this.letter, i, j)) {
                    if (this.placePiece(i, j, this.piece) != 0) {
                        this.moves.push(this.createMove(i, j, 'queen'));
                    }
                    if (this.placePiece(i, j, this.piece) == 1) {
                        continue; 
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    kingRule() {
        for (let i = 8; i < 16; i += 1) {
            if (checkBounds(this.coords, this.rank, this.letter, i, null)) {
                if (this.placePiece(i, null, this.piece) != 0) {
                    this.moves.push(this.createMove(i, null, 'king'));
                } 
            } 
        }
        return this.moves;
    }

    placePiece(i, j, givenPiece) {
        let piece = null;
        if (j != null) {
            piece = this.position[this.rank + this.coords[i][j][0]][this.letter + this.coords[i][j][1]];
        } else {
            piece = this.position[this.rank + this.coords[i][0]][this.letter + this.coords[i][1]];
        }
        if (piece == '#') {
            return 1;
        } else if (piece.color != givenPiece.color) {
            return 2;
        }
        return 0;
    }

    createMove(i, j, pieceName) {
        let move = {
            from: this.piece.position,
            to: toSquare(this.coords, this.letter, this.rank, i, j),
            piece: pieceName,
            color: this.piece.color,
        }
        return move;
    }
}

// from a given position, describe the rules for a given piece
