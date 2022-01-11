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
    calculateMinimumCost() {
        let cost = 0;
        let rows = this.weightOfRows;
        let cols = this.weightOfCols;
        let maxRow = Math.max(...rows);
        let maxCol = Math.max(...cols);
        let numHorizontalCuts = 0;
        let numVerticalCuts = 0;
        let previousNumOfRows = this.numberOfRows;
        let previousNumOfCols = this.numberOfCols;
        let numOfMaxRows;
        let numOfMaxCols;
        while (rows || cols) {
            if (maxRow >= maxCol) {
                rows = rows.filter((value) => {
                    return value < maxRow;
                });
                numOfMaxRows = previousNumOfRows - rows.length;
                if (numHorizontalCuts < this.numberOfRows) {
                    numHorizontalCuts += numOfMaxRows;
                }
                cost += maxRow * numOfMaxRows * (numVerticalCuts + 1);
                previousNumOfRows = rows.length;
            }
            else {
                cols = cols.filter((value) => {
                    return value < maxCol;
                });
                numOfMaxCols = previousNumOfCols - cols.length;
                if (numVerticalCuts < this.numberOfCols) {
                    numVerticalCuts += numOfMaxCols;
                }
                cost += maxCol * numOfMaxCols * numHorizontalCuts;
                previousNumOfCols = cols.length;
            }
        }
        return cost;
    }
}
exports.ChocolateBar = ChocolateBar;
