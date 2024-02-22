// Creates the position from the given board using DOM 

function createPosition(board) {
    let ranks = board.childNodes;
    let position = [];
    for (let rank = 1; rank <= 8; rank += 1) {
        let currentRank = ranks[rank].childNodes;
        for (let file = 0; file < 8; file += 1) {
            if (currentRank[file].hasChildNodes()) {
                let currentPiece = {
                    color: currentRank[file].firstChild.classList[0],
                    piece: currentRank[file].firstChild.classList[1],
                    position: currentRank[file].classList[1]
                };
                position.push(currentPiece);
            } 
        }
    }
    return position;
}

export {createPosition};