import Vue from 'vue';
export default function ({ }, inject) {

    var size = 9;

    const grid = [];
    for (var x = 0; x < size; x++) {
        grid[x] = [];
        for (var y = 0; y < size; y++) {
            grid[x][y] = 0;
        }
    }

    const manager = {
        grid
    }



    inject("sudokuManager", manager)
}
