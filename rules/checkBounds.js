// checks if the bounds current piece placement is out of bounds or not
export function checkBounds(coords, rank, letter, i, j) {
    if (j == null) {
        if (rank + coords[i][0] >= 0 && rank + coords[i][0] <= 7 && letter + coords[i][1] >= 0 && letter + coords[i][1] <= 7) {
            return true;
        }
        return false;
    } 
    if (rank + coords[i][j][0] >= 0 && rank + coords[i][j][0] <= 7 && letter + coords[i][j][1] >= 0 && letter + coords[i][j][1] <= 7) {
        return true;
    }
    return false;
}