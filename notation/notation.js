// Store the chess moves in a notation
class Notation {
    constructor(notation) {
        this.moveCount = 0;
        this.moves = [];  // write down the moves as in {from, to, piece, color}
        this.notation = notation;
        for (let i = 0; i < 100; i += 1) {
            this.moves.push([]);
        }
    }

    updateNotation(turn, move) {
        if (turn == 'white') {
            this.moveCount += 1;
        } 
        this.moves[this.moveCount].push(move);
    }

    displayNotation() {
        // remove the previous notation
        while (this.notation.lastChild) {
            this.notation.removeChild(this.notation.firstChild);
        }
        for (let i = 1; i <= this.moveCount; i += 1) {
            let currentMove = document.createElement('div');
            let whiteMove = document.createElement('span');
            let blackMove = document.createElement('span');
            whiteMove.classList.add('white');
            blackMove.classList.add('black');
            whiteMove.textContent = this.moveNotation(this.moves[i][0]);
            if (this.moves[i].length == 2) {
                blackMove.textContent = this.moveNotation(this.moves[i][1]);
            }
            currentMove.appendChild(whiteMove);
            currentMove.appendChild(blackMove);
            this.notation.appendChild(currentMove);
        }
    }

    moveNotation(move) {
        let madeMove = "";
        if (move.piece == 'pawn') {
            madeMove = move.to;
        } else if (move.piece == 'knight') {
            madeMove = 'N' + move.to;
        } else {
            madeMove = move.piece + move.to;
        }
        return madeMove;
    }
}

export {Notation};