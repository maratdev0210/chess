// add the rules to the game
// the position is the matrix representation of the board
export class Rules {
    constructor(position, piece) {
        this.position = position;
        this.piece = piece;
        this.moves = [];         // an array of objects: {from: initial position, to: final position, piece: type of the piece}
        this.letter = this.piece.position[0].charCodeAt(0) - 97;      // make the values of letter and rank to be zero-based
        this.rank = parseInt(this.piece.position[1]) - 1;     
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
        let coords = [[], [], [], []];
        for (let i = 1; i <= 7; i += 1) {
            coords[0].push([0, i]);
            coords[1].push([0, -i]);
            coords[2].push([i, 0]);
            coords[3].push([-i, 0]);
        }
        for (let i = 0; i < 4; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                
                if (this.rank + coords[i][j][0] >= 0 && this.rank + coords[i][j][0] <= 7 && this.letter + coords[i][j][1] >= 0 && this.letter + coords[i][j][1] <= 7) {
                    if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]] == '#') {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'rook',
                                color: this.piece.color,
                            }
                        );
                    } else if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]].color != this.piece.color) {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'rook',
                                color: this.piece.color
                            }
                        );
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    bishopRule() {
        let coords = [[], [], [], []];
        for (let i = 1; i <= 7; i += 1) {
            coords[0].push([i, i]);
            coords[1].push([-i, -i]);
            coords[2].push([-i, i]);
            coords[3].push([i, -i]);
        }
        for (let i = 0; i < 4; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (this.rank + coords[i][j][0] >= 0 && this.rank + coords[i][j][0] <= 7 && this.letter + coords[i][j][1] >= 0 && this.letter + coords[i][j][1] <= 7) {
                    if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]] == '#') {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'bishop',
                                color: this.piece.color
                            }
                        );
                    } else if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]].color != this.piece.color) {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'bishop',
                                color: this.piece.color
                            }
                        );
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    knightRule() {
        let coords = [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]; // representation of moves along the ranks and files
        for (let i = 0; i < 8; i += 1) {
            if (this.rank + coords[i][0] >= 0 && this.rank + coords[i][0] <= 7 && this.letter + coords[i][1] >= 0 && this.letter + coords[i][1] <= 7) {
                if (this.position[this.rank + coords[i][0]][this.letter + coords[i][1]].color != this.piece.color) {
                    this.moves.push(
                        {
                            from: this.piece.position,
                            to: String.fromCharCode(97 + coords[i][1] + this.letter) + String(this.rank + coords[i][0] + 1),
                            piece: 'knight',
                            color: this.piece.color
                        }
                    );
                } 
            }
        }
        return this.moves;
    }

    queenRule() {
        let coords = [[], [], [], [], [], [], [], []];
        for (let i = 1; i <= 7; i += 1) {
            coords[0].push([i, i]);
            coords[1].push([-i, -i]);
            coords[2].push([-i, i]);
            coords[3].push([i, -i]);
            coords[4].push([0, i]);
            coords[5].push([0, -i]);
            coords[6].push([i, 0]);
            coords[7].push([-i, 0]);
        }
        for (let i = 0; i < 8; i += 1) {
            for (let j = 0; j < 7; j += 1) {
                if (this.rank + coords[i][j][0] >= 0 && this.rank + coords[i][j][0] <= 7 && this.letter + coords[i][j][1] >= 0 && this.letter + coords[i][j][1] <= 7) {
                    if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]] == '#') {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'queen',
                                color: this.piece.color,
                            }
                        );
                    } else if (this.position[this.rank + coords[i][j][0]][this.letter + coords[i][j][1]].color != this.piece.color) {
                        this.moves.push(
                            {
                                from: this.piece.position,
                                to: String.fromCharCode(97 + coords[i][j][1] + this.letter) + String(this.rank + coords[i][j][0] + 1),
                                piece: 'queen',
                                color: this.piece.color
                            }
                        );
                        break;
                    } else {
                        break;
                    }
                }
            }
        }
        return this.moves;
    }

    kingRule() {
        let coords = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < 8; i += 1) {
            if (this.rank + coords[i][0] >= 0 && this.rank + coords[i][0] <= 7 && this.letter + coords[i][1] >= 0 && this.letter + coords[i][1] <= 7) {
                if (this.position[this.rank + coords[i][0]][this.letter + coords[i][1]].color != this.piece.color) {
                    this.moves.push(
                        {
                            from: this.piece.position,
                            to: String.fromCharCode(97 + this.letter + coords[i][1]) + String(this.rank + coords[i][0] + 1),
                            piece: 'king',
                            color: this.piece.color
                        }
                    );
                } 
            } 
        }
        return this.moves;
    }
}

// from a given position, describe the rules for a given piece
