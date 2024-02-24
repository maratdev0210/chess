import {blackPieces} from "../UI/pieces/black/blackPiece.js";
import {whitePieces} from "../UI/pieces/white/whitePiece.js";
import {currentSquare} from "../board/currentSquare.js";

class Board {
    constructor(position) {
        this.position = position;
        this.matrix = [];
        for (let rank = 1; rank <= 8; rank += 1) {
            let row = [];
            for (let file = 1; file <= 8; file += 1) {
                let currentPosition = currentSquare(file, rank);
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
                let currentPosition = currentSquare(file, rank);
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

