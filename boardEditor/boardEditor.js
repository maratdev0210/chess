import {whitePieces} from '../UI/pieces/white/whitePiece.js';
import {blackPieces} from '../UI/pieces/black/blackPiece.js';
import {gameState} from '../state/state.js';
import {createPosition} from './positionEdit.js';
import {Board} from '../board/board.js';
import {legalMoves} from '../legal moves/legalMoves.js';
import {Notation} from '../notation/notation.js';
import {initialPosition} from '../boardEditor/initialPosition.js';
import {Stalemate} from '../rules/stalemate.js';
import {shortCastle } from '../rules/shortCastle.js';
import {longCastle } from '../rules/longCastle.js';
import {currentSquare } from '../board/currentSquare.js';

const root = document.querySelector('body');
const chessBoard = document.querySelector('.board');
const white = document.querySelector('div.white');
const black = document.querySelector('div.black');
const loadButton = document.querySelector('.load');
const loadInitial = document.querySelector('.initial');
let position = null;
let pieces = document.querySelector('.pieces');
let state = null; // store the game state
let board = null; 
let listMoves = null;
let isLoaded = null;
let isPromoted = false;        
let chessNotation = document.querySelector('.notation');
let notation = null;
let isInitial = null;
let shortCastleInit = null;
let longCastleInit = null;


// returns the list of options for promoted pawn
function promotionPieceWhite() {
    for (let piece of Object.keys(whitePieces.standard)) {
        if (piece == 'king' || piece == 'pawn') {
            continue;
        }
        let img = document.createElement('img');
        img.setAttribute('src', whitePieces.standard[piece]);
        let cell = document.createElement('div');
        cell.appendChild(img);
        img.classList.add('white');
        img.classList.add(piece);
        img.classList.add('promotion');
        root.appendChild(cell);
    }
}

function promotionPieceBlack() {
    for (let piece of Object.keys(blackPieces.standard)) {
        if (piece == 'king' || piece == 'pawn') {
            continue;
        }
        let img = document.createElement('img');
        img.setAttribute('src', blackPieces.standard[piece]);
        let cell = document.createElement('div');
        cell.appendChild(img);
        img.classList.add('black');
        img.classList.add(piece);
        img.classList.add('promotion');
        root.appendChild(cell);
    }
}

function isOutOfBoard(square) {
    return (square.childElementCount == 8) ? true: false;
}

window.addEventListener('load', () => {
    for (let rank = 8; rank >= 1; rank -= 1) {
        let row = document.createElement('div');
        for (let file = 1; file <= 8; file += 1) {
            let currentPosition = currentSquare(file, rank);
            let square = document.createElement('div');
            let squareColor = (rank + file) % 2 == 1 ? 'white' : 'black';
            square.classList.add(squareColor);
            square.classList.add(currentPosition);
            row.appendChild(square);
        }
        chessBoard.appendChild(row);
    }
});

// add white pieces selection
window.addEventListener('load', () => {
    for (let piece of Object.keys(whitePieces.standard)) {
        let img = document.createElement('img');
        img.setAttribute('src', whitePieces.standard[piece]);
        let cell = document.createElement('div');
        cell.appendChild(img);
        img.classList.add('white');
        img.classList.add(piece);
        white.appendChild(cell);
    }
});


// add black pieces selection
window.addEventListener('load', () => {
    for (let piece of Object.keys(blackPieces.standard)) {
        let img = document.createElement('img');
        img.setAttribute('src', blackPieces.standard[piece]);
        let cell = document.createElement('div');
        cell.appendChild(img);
        img.classList.add('black');
        img.classList.add(piece);
        black.appendChild(cell);
    }
});

window.addEventListener('load', () => {
    loadInitial.addEventListener('click', () => {
        isInitial = true;
        return;
    });
    
    loadButton.addEventListener('click', () => {
        isLoaded = true;
        if (isInitial) {
            state = new gameState('white');
            position = initialPosition();
            board = new Board(position);
            board.displayBoard();
            notation = new Notation(chessNotation);
            return;
        }
        let turn = String(document.querySelector('input[name="turn"]:checked').value);
        state = new gameState(turn);
        position = createPosition(chessBoard);
        board = new Board(position);
        notation = new Notation(chessNotation);
    });

    loadButton.addEventListener('click', () => {
        // play the game here
        //console.log(listMoves.findMoves());
        let selectedPiece = {
            piece: null, 
            position: null,
            color: null
        };
        // Select the piece that the current player will move during his turn
        chessBoard.addEventListener('click', (event) => {
            if (!isLoaded) {
                return;
            }
            if (event.target.nodeName == 'IMG' && event.target.classList[0] == state.turn) {
                let position = event.target.parentNode.classList[1];
                let color = event.target.classList[0];
                let piece = event.target.classList[1];
                selectedPiece = {
                    piece: piece,
                    position: position,
                    color: color,
                };
            }
        });

        chessBoard.addEventListener('click', (event) => {
            console.log(board.matrix);
            let moves = new legalMoves(board.matrix, state.turn);
            let listMoves = moves.findMoves();
            // the king is checkmated
            if (listMoves.length == 0) {
                let stalemate = new Stalemate(board.matrix, state.turn);
                if (stalemate.isStalemate() == false) {
                    alert("The king is checkmated");
                } else {
                    alert("The king is stalemated");
                }
                return;
            }
            //let listMoves = moves.findMoves();    // find all the valid moves excluding the checks and checkmates
            console.log(listMoves);
            let selectedPosition = event.target;
            // get the selected square when placing the piece
            if (selectedPosition.nodeName == 'IMG') {
                selectedPosition = selectedPosition.parentNode.classList[1];
            } else {
                selectedPosition = selectedPosition.classList[1];
            }
            if (selectedPosition == undefined) {
                return;
            }
            let isValid = false;
            let from = selectedPiece.position;
            let to = selectedPosition;
            // check if castling is possible
            if (selectedPiece.piece == 'king') {
                shortCastleInit = new shortCastle(board.matrix, notation.moves, state.turn);
                longCastleInit = new longCastle(board.matrix, notation.moves, state.turn);
                console.log(state.turn);
                if (state.turn == 'white') {
                    if (to == 'g1') {
                        console.log(notation.moves);
                        if (shortCastleInit.canCastle()) {
                            notation.updateNotation(state.turn, '0-0');
                            notation.displayNotation();
                            board = board.updatePosition({from: 'e1', to: 'g1', piece: 'king', color: 'white'});
                            board = board.updatePosition({from: 'h1', to: 'f1', piece: 'rook', color: 'white'});
                            board.displayBoard();
                            state.turn = 'black';
                            return;
                        }
                    } else if (to == 'c1') {
                        console.log(notation.moves);
                        console.log(state.turn);
                        if (longCastleInit.canCastleD()) {
                            notation.updateNotation(state.turn, '0-0-0');
                            notation.displayNotation();
                            board = board.updatePosition({from: 'e1', to: 'c1', piece: 'king', color: 'white'});
                            board = board.updatePosition({from: 'a1', to: 'd1', piece: 'rook', color: 'white'});
                            board.displayBoard();
                            state.turn = 'black';
                            return;
                        }
                    }
                } else if (state.turn == 'black') {
                    if (to == 'g8') {
                        console.log(notation.moves);
                        if (shortCastleInit.canCastle()) {
                            notation.updateNotation(state.turn, '0-0');
                            notation.displayNotation();
                            board = board.updatePosition({from: 'e8', to: 'g8', piece: 'king', color: 'black'});
                            board = board.updatePosition({from: 'h8', to: 'f8', piece: 'rook', color: 'black'});
                            board.displayBoard();
                            state.turn = 'white';
                            return;
                        }
                    } else if (to == 'c8') {
                        if (longCastleInit.canCastleD()) {
                            notation.updateNotation(state.turn, '0-0-0');
                            notation.displayNotation();
                            board = board.updatePosition({from: 'e8', to: 'c8', piece: 'king', color: 'black'});
                            board = board.updatePosition({from: 'a8', to: 'd8', piece: 'rook', color: 'black'});
                            board.displayBoard();
                            state.turn = 'white';
                            return;
                        }
                    }
                }
            }
            let selectedMove = null;
            for (let move of listMoves) {
                if (move.from == from && move.to == to && move.piece == selectedPiece.piece) {
                    isValid = true;
                    selectedMove = move;
                }
            }
            console.log(from);
            console.log(to);
            console.log(state.turn);
            if (isValid) {
                console.log(notation.moves);
                console.log(state.turn);
                if (selectedMove.piece == 'pawn' && selectedMove.color == 'white' && parseInt(selectedMove.to[1]) == 8) {
                    promotionPieceWhite();
                    while (isPromoted == false) {
                        root.addEventListener('click', (event) => {
                            if (event.target.nodeName == 'IMG' && event.target.classList.contains('promotion')) {
                                selectedMove = {
                                    from: from,
                                    to: to,
                                    piece: event.target.classList[1],
                                    color: 'white',
                                };
                                console.log(selectedMove);
                                board = board.updatePosition(selectedMove);
                                board.displayBoard();
                                return;
                            }
                        });
                        //console.log('yess');
                        break;
                    }
                    if (state.turn == 'white') {
                        state.turn = 'black';
                    } else {
                        state.turn = 'white';
                    }
                } else if (selectedMove.piece == 'pawn' && selectedMove.color == 'black' && parseInt(selectedMove.to[1]) == 1) {
                    promotionPieceBlack();
                    while (isPromoted == false) {
                        root.addEventListener('click', (event) => {
                            if (event.target.nodeName == 'IMG' && event.target.classList.contains('promotion')) {
                                selectedMove = {
                                    from: from,
                                    to: to,
                                    piece: event.target.classList[1],
                                    color: 'black',
                                };
                                board = board.updatePosition(selectedMove);
                                board.displayBoard();
                                return;
                            }
                        });
                        break;
                    }
                    if (state.turn == 'white') {
                        state.turn = 'black';
                    } else {
                        state.turn = 'white';
                    }
                } else {
                    console.log(state.turn);
                    console.log(chessNotation);
                    notation.updateNotation(state.turn, selectedMove);
                    notation.displayNotation();
                    board = board.updatePosition(selectedMove);
                    board.displayBoard();
                    if (state.turn == 'white') {
                        state.turn = 'black';
                    } else {
                        state.turn = 'white';
                    }
                }
    
            } 
        });
    });
})


window.addEventListener('load', () => {
    let Piece = {
        selectedPiece: null,
        color: null,
        piece: null,
    }
    pieces.addEventListener('click', (event) => {
        if (event.target.nodeName == 'IMG') {
            Piece.selectedPiece = event.target.getAttribute('src');
            Piece.color = event.target.classList[0];
            Piece.piece = event.target.classList[1];
        }
    });
    chessBoard.addEventListener('click', (event) => {
        if (Piece.selectedPiece == null) {
            return;
        }
        let selectedPieceImg = document.createElement('img');
        selectedPieceImg.setAttribute('src', Piece.selectedPiece);
        selectedPieceImg.classList.add(Piece.color);
        selectedPieceImg.classList.add(Piece.piece);
        let square = event.target;
        if (event.target.nodeName == 'IMG') {
            square = event.target.parentNode;
            event.target.parentNode.removeChild(event.target);
        } 
        if (isOutOfBoard(square) === false && Piece.selectedPiece != null) {
            square.appendChild(selectedPieceImg);
        } else {
            Piece = {
                selectedPiece: null, 
                color: null, 
                piece: null,
            };
        }
    })
});


