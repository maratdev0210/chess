import {blackPieces} from "../UI/pieces/black/blackPiece.js";
import {whitePieces} from "../UI/pieces/white/whitePiece.js";

let positionX = [
    {
        color: 'white',
        piece: 'pawn',
        position: 'a2'
    },
    {
        color: 'white',
        piece: 'rook',
        position: 'a1',
    },
    {
        color: 'black',
        piece: 'pawn',
        position: 'a5',
    },
    {
        color: 'black',
        piece: 'king',
        position: 'e8',
    }
];


class Board {
    constructor(position) {
        this.position = position;
        this.matrix = [];
        for (let rank = 1; rank <= 8; rank += 1) {
            let row = [];
            for (let file = 1; file <= 8; file += 1) {
                let fileLetter = String.fromCharCode(96 + file);
                let currentPosition = fileLetter + String(rank);
                if (this.getPiece(currentPosition) !== null) {
                    row.push(this.getPiece(currentPosition));
                } else {
                    row.push('#');
                }
            }
            this.matrix.push(row);
        }
    }

    displayBoard() {
        let chessBoard = document.querySelector('.board');
        while (chessBoard.lastChild) {
            chessBoard.removeChild(chessBoard.lastChild);
        }
        for (let rank = 8; rank >= 1; rank -= 1) {
            let currentRank = document.createElement('div');
            for (let file = 1; file <= 8; file += 1) {
                let fileLetter = String.fromCharCode(96 + file);
                let currentPosition = fileLetter + String(rank);
                let chessPiece = this.getPiece(currentPosition);
                let squareColor = (rank + file) % 2 == 1 ? 'white' : 'black';
                let square = document.createElement('div');
                if (chessPiece !== null) {
                    let img = document.createElement('img');
                    if (chessPiece.color == 'white') {
                        img.setAttribute('src', whitePieces.standard[chessPiece.piece]);
                    } else {
                        img.setAttribute('src', blackPieces.standard[chessPiece.piece]);
                    }
                    img.classList.add(chessPiece.color, chessPiece.piece);
                    square.appendChild(img);
                }
                square.classList.add(squareColor);
                square.classList.add(currentPosition);
                currentRank.appendChild(square);
            }
            chessBoard.appendChild(currentRank);
        } 
    }

    getPosition() {
        return new Board(this.position);
    } 

    updatePosition(move) {
        let newPosition = [], index = -1;     // store the index of the captured element 
        for (let piece of this.position) {
            if (piece.position == move.from) {
                for (let i = 0; i < this.position.length; i += 1) {
                    if (this.position[i].position == move.to) {
                        index = i;
                        break;
                    }
                }
                newPosition.push({
                    color: piece.color,
                    position: move.to, 
                    piece: move.piece,
                });
            } else {
                newPosition.push(piece);
            }
        }
        if (index != -1) {
            newPosition.splice(index, 1);
        }
        console.log(newPosition);
        return new Board(newPosition);
    }

    // converts matrix position to normal position
    convertMatrix() {
        let newPosition = [];
        for (let rank of this.position) {
            for (let piece of rank) {
                if (piece != '#') {
                    newPosition.push(piece);
                }
            }
        }
        return new Board(newPosition);
    }

    getPreviousPosition() {

    }

    getPiece(square) {
        for (let piece of this.position) {
            if (piece.position == square) {
                return piece;
            }
        }
        return null;
    }
}

export {Board};

