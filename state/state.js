class gameState {
    constructor(turn) {
        this.turn = turn;
        this.moves = 0;        // 50-move rule 
        this.checkmate = false;
        this.stalemate = false;
    }

    updateMove() {
        this.moves += 1;
    }

    resetMove() {
        this.moves = 0;
    }

    set isCheckmate(value) {
        this.checkmate = value;
    }

    set isStalemate(value) {
        this.stalemate = value;
    }
}

export {gameState};