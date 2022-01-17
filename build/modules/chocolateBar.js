"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChocolateBar = void 0;
class ChocolateBar {
    constructor(weightRowEdges, weightColEdges) {
        this.weightRowEdges = weightRowEdges.map((rowEdge) => {
            return [rowEdge, "row"];
        });
        this.weightColEdges = weightColEdges.map((colEdge) => {
            return [colEdge, "col"];
        });
    }
    get allWeightsSorted() {
        const allWeights = [...this.weightRowEdges, ...this.weightColEdges];
        return allWeights.sort((a, b) => b[0] - a[0]);
    }
    calculateMinimumCost() {
        let minimumCost = 0;
        let countRows = 1;
        let countCols = 1;
        this.allWeightsSorted.forEach((weight) => {
            if (weight[1] == "row") {
                countRows++;
                minimumCost += weight[0] * countCols;
            }
            else {
                countCols++;
                minimumCost += weight[0] * countRows;
            }
        });
        return minimumCost;
    }
}
exports.ChocolateBar = ChocolateBar;
