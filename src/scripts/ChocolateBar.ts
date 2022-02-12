/**
 * Chocolate bar object. here lies the algorithm to calculate minimum cost
 *
 * @class {ChocolateBar}
 * @implements {iChocolateBar}
 */
class ChocolateBar implements iChocolateBar {
  rowEdges: Edge[];
  colEdges: Edge[];
  /**
   * The weights of the rows and colums are given as parameters.
   * Those weights are mapped into {@rowEdges} and {@colEdges} indicating the orientation.
   *
   * @constructs
   * @param rowEdgesWeights -
   * @param colEdgesWeights
   */
  constructor(rowEdgesWeights: number[] = [], colEdgesWeights: number[] = []) {
    this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
      return new Edge(rowEdgeWeight, "row");
    });
    this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
      return new Edge(colEdgeWeight, "col");
    });
  }

  /**
   * Height value is based on the {rowEdges} lenght
   */
  get height(): number {
    return this.rowEdges.length + 1;
  }

  /**
   * Width value is based on the {colEdges} lenght
   */
  get width(): number {
    return this.colEdges.length + 1;
  }

  /**
   * Minimum Cost Algorithm
   *
   * @description Edges are cut from largest to lowest according to weight.
   * The weight of an edge is added to the cost when the edge is cut.
   * Weight must be added as many time as number of slices the are in the opposite orientation.
   * Number of slices are tracked in count variables.
   */
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

  /**
   * All edges are sorted from max weight to min weight
   */
  get sortedEdges(): Edge[] {
    const edges = [...this.rowEdges, ...this.colEdges];
    return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
  }
}
