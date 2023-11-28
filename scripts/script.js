const BLACK_ROOK = './assets/pieces/black/Chess_rdt45.svg';
const BLACK_KNIGHT = './assets/pieces/black/Chess_ndt45.svg';
const BLACK_BISHOP = './assets/pieces/black/Chess_bdt45.svg';
const BLACK_QUEEN = './assets/pieces/black/Chess_qdt45.svg';
const BLACK_KING = './assets/pieces/black/Chess_kdt45.svg';
const BLACK_PAWN = './assets/pieces/black/Chess_pdt45.svg';
const WHITE_ROOK = './assets/pieces/white/Chess_rlt45.svg';
const WHITE_KNIGHT = './assets/pieces/white/Chess_nlt45.svg';
const WHITE_BISHOP = './assets/pieces/white/Chess_blt45.svg';
const WHITE_QUEEN = './assets/pieces/white/Chess_qlt45.svg';
const WHITE_KING = './assets/pieces/white/Chess_klt45.svg';
const WHITE_PAWN = './assets/pieces/white/Chess_plt45.svg';
const notation = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


const chessPieces = {
    row8: [BLACK_ROOK, BLACK_KNIGHT, BLACK_BISHOP, BLACK_QUEEN, BLACK_KING, BLACK_BISHOP, BLACK_KNIGHT, BLACK_ROOK],
    row7: [BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN, BLACK_PAWN],
    row2: [WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN, WHITE_PAWN],
    row1: [WHITE_ROOK, WHITE_KNIGHT, WHITE_BISHOP, WHITE_QUEEN, WHITE_KING, WHITE_BISHOP, WHITE_KNIGHT, WHITE_ROOK]
};

function addPieces(board, currentRow) {
    let rowNumber = currentRow.getAttribute('class');
    if (rowNumber in chessPieces) {
        let tiles = currentRow.childNodes;
        tiles.forEach(function(tile, column) {
            let piece = document.createElement('img');
            piece.setAttribute('src', chessPieces[rowNumber][column]);
            tile.appendChild(piece);
            if (rowNumber === 'row1') {
                let notationLetter = document.createElement('span');
                notationLetter.textContent = notation[column];
                tile.appendChild(notationLetter);
            }
        });
    } 
}

function generateBoard(board) {
    for (let row = 8; row >= 1; --row) {
        let currentRow = document.createElement('div');
        currentRow.setAttribute('class', `row${row}`);
        for (let col = 1; col <= 8; ++col) {
            let tile = document.createElement('div');
            (row + col) % 2 == 0 ? tile.setAttribute('class', 'black') : tile.setAttribute('class', 'white');
            currentRow.appendChild(tile);
        }
        board.appendChild(currentRow);
        addPieces(board, currentRow);
    }
}

let board = document.querySelector('.board');

window.addEventListener('load', generateBoard(board));