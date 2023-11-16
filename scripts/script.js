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

let board = document.querySelector('.board');

// rows = [rowEight, rowSeven, rowTwo, rowOne]
function fillBoard(rows) {
    for (let row in rows) {
        let columns = rows[row].children;
        for (let col = 0; col < 8; ++col) {
            let piece = document.createElement('img');
            piece.setAttribute('draggable', 'true');
            piece.setAttribute('class', 'piece');
            if (row == 1) {
                piece.setAttribute('src', BLACK_PAWN);
                columns[col].appendChild(piece);
                continue;
            }
            if (row == 2) {
                piece.setAttribute('src', WHITE_PAWN);
                columns[col].appendChild(piece);
                continue;
            }
            if (col == 0 || col == 7) {
                if (row == 0) {
                    piece.setAttribute('src', BLACK_ROOK);
                } else if (row == 3) {
                    piece.setAttribute('src', WHITE_ROOK);
                }
            }
            else if (col == 1 || col == 6) {
                if (row == 0) {
                    piece.setAttribute('src', BLACK_KNIGHT);
                } else if (row == 3) {
                    piece.setAttribute('src', WHITE_KNIGHT);
                }
            } else if (col == 2 || col == 5) {
                if (row == 0) {
                    piece.setAttribute('src', BLACK_BISHOP);
                } else if (row == 3) {
                    piece.setAttribute('src', WHITE_BISHOP);
                }
            } else if (col == 3) {
                if (row == 0) {
                    piece.setAttribute('src', BLACK_QUEEN);
                } else if (row == 3) {
                    piece.setAttribute('src', WHITE_QUEEN);
                }
            } else if (col == 4) {
                if (row == 0) {
                    piece.setAttribute('src', BLACK_KING);
                } else if (row == 3) {
                    piece.setAttribute('src', WHITE_KING);
                }
            }
            columns[col].appendChild(piece);
        }
    }
}


window.addEventListener('load', () => {
    for (let row = 0; row < 8; ++row) {
        let rowSpan = document.createElement('div');
        rowSpan.setAttribute('class', `row${row}`);
        for (let col = 0; col < 8; ++col) {
            let tile = document.createElement('div');
            tile.setAttribute('class', 'white');     // default tile's color is white
            if ((row + col) % 2 == 1) {
                tile.setAttribute('class', 'black');
            } 
            if (row == 7) {
                let notationHold = document.createElement('span');
                notationHold.textContent = notation[col];
                tile.appendChild(notationHold);
            }
            rowSpan.appendChild(tile);
        }
        board.appendChild(rowSpan);
    }
    let rowEight = document.querySelector('.board .row0');
    let rowSeven = document.querySelector('.board .row1');
    let rowTwo = document.querySelector('.board .row6');
    let rowOne = document.querySelector('.board .row7');
    let rows = [rowEight, rowSeven, rowTwo, rowOne];
    fillBoard(rows);
});

window.addEventListener('load', () => {
    let chessPieceList = document.querySelectorAll('.board img');
    let chessPiecePicked, chessPiecePlaced;    
    chessPieceList.forEach((chessPiece) => {
        //let chessPiecePicked;   // call Event listener on the picked chess piece
        chessPiece.addEventListener('drag', (event) => {
            chessPiecePicked = event.target;
        });
        let chessTileList = document.querySelectorAll('.board div div');
        chessTileList.forEach((chessTile) => {
            chessTile.addEventListener('dragover', (event) => {
                // prevent default to allow drop
                chessPiecePlaced = event.target;
                event.preventDefault();
            }); 
            chessTile.addEventListener('drop', (event) => {
                //console.log(event.target); 
                /*
                    if event.target.className is 'piece', then:
                        1. remove chess Piece from the original position
                        2. remove chess piece from the ending position (event.target.removeChild())
                */
                event.preventDefault();
                if (event.target.className == 'white' || event.target.className == 'black') {
                    chessPiecePicked.parentNode.removeChild(chessPiecePicked);
                    event.target.appendChild(chessPiecePicked);
                    
                } else if (event.target.className == 'piece') {
                    if (chessPiecePlaced.parentNode !== null) {
                        chessPiecePlaced.parentNode.replaceChild(chessPiecePicked, chessPiecePlaced);
                    }
                    //chessPiecePlaced.parentNode.replaceChild(chessPiecePicked, chessPiecePlaced);
                    
                    //chessPiecePicked.parentNode.removeChild(chessPiecePicked);
                    //event.target.parentNode.replaceChild(chessPiecePicked, chessPiecePlaced);
                    console.log(chessPiecePlaced.parentNode);
                    //chessPiecePlaced.parentNode.removeChild(chessPiecePlaced);
                    
                    //event.target.parentNode.appendChild(chessPiecePicked);
                    //console.log(event.target.parentNode.removeChild(event.target));
                } 
            });
            
        });
    });
});

