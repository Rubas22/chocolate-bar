"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChocolateBar = void 0;
class ChocolateBar {
    constructor(weightOfRows, weightOfCols) {
        this.weightOfRows = weightOfRows;
        this.weightOfCols = weightOfCols;
    }
    get numberOfRows() {
        return this.weightOfRows.length;
    }
    get numberOfCols() {
        return this.weightOfCols.length;
    }
    get sortedWeights() {
        const allWeights = this.weightOfRows.concat(this.weightOfCols);
        return allWeights.sort((a, b) => a - b);
    }
}
exports.ChocolateBar = ChocolateBar;
