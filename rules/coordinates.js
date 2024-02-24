// create the object of all the coordinates, used for queen moves, rook moves, bishop moves, and knight moves
export function createCoords() {
    let coords = [[], [], [], [], [], [], [], [], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]];
    // first four coords rules for bishop
    // the next four coords rules for rook
    for (let i = 1; i <= 7; i += 1) {
        coords[0].push([i, i]);
        coords[1].push([-i, -i]);
        coords[2].push([-i, i]);
        coords[3].push([i, -i]);
        coords[4].push([0, i]);
        coords[5].push([0, -i]);
        coords[6].push([i, 0]);
        coords[7].push([-i, 0]);
    }
    
    return coords;
}