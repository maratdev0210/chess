// returns the square to which the piece will be placed
export function toSquare(coords, letter, rank, i, j) {
    if (j == null) {
        return String.fromCharCode(97 + coords[i][1] + letter) + String(rank + coords[i][0] + 1);
    }
    return String.fromCharCode(97 + coords[i][j][1] + letter) + String(rank + coords[i][j][0] + 1);
}