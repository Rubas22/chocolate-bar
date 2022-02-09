"use strict";
class ChocolateBar {
    constructor(height = 0, width = 0) {
        this.rowEdges = [];
        this.colEdges = [];
        this.height = height;
        this.width = width;
    }
    get minimumCost() {
        let minimumCost = 0;
        let rowsCount = 1;
        let colsCount = 1;
        this.sortedEdges.forEach((edge) => {
            switch (edge.orientation) {
                case "row":
                    rowsCount++;
                    minimumCost += edge.weight * colsCount;
                    break;
                case "col":
                    colsCount++;
                    minimumCost += edge.weight * rowsCount;
                    break;
            }
        });
        return minimumCost;
    }
    get sortedEdges() {
        const edges = [...this.rowEdges, ...this.colEdges];
        return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
    }
    reassignEdges(rowEdgesWeights, colEdgesWeights) {
        this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
            return new Edge(rowEdgeWeight, "row");
        });
        this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
            return new Edge(colEdgeWeight, "col");
        });
    }
}
