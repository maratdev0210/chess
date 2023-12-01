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

const pieceNotation = {
    row: ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
};

function addPieces(board, currentRow) {
    let rowNumber = currentRow.getAttribute('class');
    if (rowNumber in chessPieces) {
        let tiles = currentRow.childNodes;
        tiles.forEach(function(tile, column) {
            let piece = document.createElement('img');
            piece.setAttribute('src', chessPieces[rowNumber][column]);
            tile.appendChild(piece);
            if (rowNumber === 'row1' || rowNumber === 'row8') {
                piece.setAttribute('class', pieceNotation['row'][column]);
            } else if (rowNumber === 'row2' || rowNumber === 'row7') {
                piece.setAttribute('class', 'p');
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
            let tileIndex = notation[col - 1] + row.toString();
            (row + col) % 2 == 0 ? tile.setAttribute('class', `black ${tileIndex}`) : tile.setAttribute('class', `white ${tileIndex}`);
            currentRow.appendChild(tile);
        }
        board.appendChild(currentRow);
        addPieces(board, currentRow);
    }
}

let board = document.querySelector('.board');

window.addEventListener('load', generateBoard(board));


function placePiece(chessPiece, tile) {
    if (chessPiece !== null) {
        tile.appendChild(chessPiece);
    }
}

function markPiece(chessPiece, tile) {
    if (chessPiece !== null) {
        tile.classList.add('markPiece');
    }
}

let tiles = document.querySelectorAll('.board div div');
let chessPiece = null;
tiles.forEach(function(tile) {
    tile.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG') {
            if (chessPiece === null) {
                chessPiece = event.target;
            } else {
                /*let chessPieceToCapture = event.target.getAttribute('src');
                let chessPieceToMove = chessPiece.getAttribute('src');
                let canCapture = (chessPieceToCapture.includes('black') && chessPieceToMove.includes('white')) ||
                                 (chessPieceToCapture.includes('white') && chessPieceToMove.includes('black'));
                if (canCapture) {
                    let tileToPlace = event.target.parentNode;
                    event.target.parentNode.removeChild(event.target);
                    placePiece(chessPiece, tileToPlace);
                } */
                moveWhitePawn(chessPiece, event.target.parentNode);
                moveBlackPawn(chessPiece, event.target.parentNode);
                chessPiece.classList.remove('markPiece');
                chessPiece = null; 
            }
        } else {
            moveWhitePawn(chessPiece, event.target);
            moveBlackPawn(chessPiece, event.target);
            chessPiece.classList.remove('markPiece');
            chessPiece = null;
        }
        markPiece(chessPiece, event.target);
    })
});


function moveWhitePawn(chessPiece, tile) {
    console.log(tile.classList[1]);
    console.log(chessPiece.parentNode);
    let file = chessPiece.parentNode.classList[1][0];     // get the file where the piece stands
    let rank = Number(chessPiece.parentNode.classList[1][1]);     // get the rank where the piece stands
    const tileOptions = [];                               // store the possible tiles to place the pawn
    if (rank == 2) {
        for (let currentRank = rank + 1; currentRank <= 4; ++currentRank) {
            let nextTile = document.getElementsByClassName(file + String(currentRank));
            if (nextTile[0].hasChildNodes()) {
                break;
            }
            tileOptions.push(file + String(currentRank));
        }
    } else if (rank < 8) {
        let nextTile = document.getElementsByClassName(file + String(rank + 1));
        if (!nextTile[0].hasChildNodes()) {
            tileOptions.push(file + String(rank + 1));
        }
    } else {
        return;
    }

    let index = notation.findIndex((element) => {
        return element === file;
    });
    if (index == 0) {
        let nextTile = document.getElementsByClassName(notation[index + 1] + String(rank + 1));
        if (nextTile[0].hasChildNodes()) {
            // check if the piece is white or black
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('black')) {
                tileOptions.push(notation[index + 1] + String(rank + 1));
            }
        }
    } else if (index == 7) {
        let nextTile = document.getElementsByClassName(notation[index - 1] + String(rank + 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('black')) {
                tileOptions.push(notation[index - 1] + String(rank + 1));
            }
        }
    } else {
        let nextTile = document.getElementsByClassName(notation[index + 1] + String(rank + 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('black')) {
                tileOptions.push(notation[index + 1] + String(rank + 1));
            }
        }
        nextTile = document.getElementsByClassName(notation[index - 1] + String(rank + 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('black')) {
                tileOptions.push(notation[index - 1] + String(rank + 1));
            }
        }
    }
    // determine if the tile we are to set the chess piece matches the chess rules
    if (tileOptions.includes(tile.classList[1]) && chessPiece.classList[0] == 'p') {
        if (tile.hasChildNodes()) {
            tile.removeChild(tile.firstChild);
            tile.appendChild(chessPiece);
        } else {
            tile.appendChild(chessPiece);
        }
    } else {
        return;
    }
}

function moveBlackPawn(chessPiece, tile) {
    console.log(tile.classList[1]);
    console.log(chessPiece.parentNode);
    let file = chessPiece.parentNode.classList[1][0];     // get the file where the piece stands
    let rank = Number(chessPiece.parentNode.classList[1][1]);     // get the rank where the piece stands
    const tileOptions = [];                               // store the possible tiles to place the pawn
    if (rank == 7) {
        for (let currentRank = rank - 1; currentRank >=5; --currentRank) {
            let nextTile = document.getElementsByClassName(file + String(currentRank));
            if (nextTile[0].hasChildNodes()) {
                break;
            }
            tileOptions.push(file + String(currentRank));
        }
    } else if (rank > 1) {
        let nextTile = document.getElementsByClassName(file + String(rank - 1));
        if (!nextTile[0].hasChildNodes()) {
            tileOptions.push(file + String(rank - 1));
        }
    } else {
        return;
    }

    let index = notation.findIndex((element) => {
        return element === file;
    });
    if (index == 0) {
        let nextTile = document.getElementsByClassName(notation[index + 1] + String(rank - 1));
        if (nextTile[0].hasChildNodes()) {
            // check if the piece is white or black
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('white')) {
                tileOptions.push(notation[index + 1] + String(rank - 1));
            }
        }
    } else if (index == 7) {
        let nextTile = document.getElementsByClassName(notation[index - 1] + String(rank - 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('white')) {
                tileOptions.push(notation[index - 1] + String(rank - 1));
            }
        }
    } else {
        let nextTile = document.getElementsByClassName(notation[index + 1] + String(rank - 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('white')) {
                tileOptions.push(notation[index + 1] + String(rank - 1));
            }
        }
        nextTile = document.getElementsByClassName(notation[index - 1] + String(rank - 1));
        if (nextTile[0].hasChildNodes()) {
            let pieceToCapture = nextTile[0].firstChild.getAttribute('src');
            if (pieceToCapture.includes('white')) {
                tileOptions.push(notation[index - 1] + String(rank - 1));
            }
        }
    }
    // determine if the tile we are to set the chess piece matches the chess rules
    if (tileOptions.includes(tile.classList[1]) && chessPiece.classList[0] == 'p') {
        if (tile.hasChildNodes()) {
            tile.removeChild(tile.firstChild);
            tile.appendChild(chessPiece);
        } else {
            tile.appendChild(chessPiece);
        }
    } else {
        return;
    }
}