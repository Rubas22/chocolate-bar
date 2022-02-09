class ChocolateBar {
  height: number;
  width: number;
  rowEdges: Edge[] = [];
  colEdges: Edge[] = [];
  constructor(height: number = 0, width: number = 0) {
    this.height = height;
    this.width = width;
  }

  get minimumCost(): number {
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

  get sortedEdges(): Edge[] {
    const edges = [...this.rowEdges, ...this.colEdges];
    return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
  }

  reassignEdges(rowEdgesWeights: number[], colEdgesWeights: number[]) {
    this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
      return new Edge(rowEdgeWeight, "row");
    });
    this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
      return new Edge(colEdgeWeight, "col");
    });
  }
}
