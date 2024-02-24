export function currentSquare(file, rank) {
    return String.fromCharCode(96 + file) + String(rank);
}