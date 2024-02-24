// check if the given square is empty or if there is a piece standing there
export function isSquareEmpty(square, position) {
    for (let rank of position) {
        for (let piece of rank) {
            if (piece == '#') {
                continue;
            }
            if (piece.position == square) {
                return false;
            }
        }
    }
    return true;
}