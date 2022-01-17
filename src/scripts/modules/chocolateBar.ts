export class ChocolateBar {
  weightRowEdges: [number, "row"][];
  weightColEdges: [number, "col"][];

  constructor(weightRowEdges: number[], weightColEdges: number[]) {
    this.weightRowEdges = weightRowEdges.map((rowEdge) => {
      return [rowEdge, "row"];
    });
    this.weightColEdges = weightColEdges.map((colEdge) => {
      return [colEdge, "col"];
    });
  }

  get allWeightsSorted(): [number, string][] {
    const allWeights = [...this.weightRowEdges, ...this.weightColEdges];
    return allWeights.sort((a, b) => b[0] - a[0]);
  }

  calculateMinimumCost(): number {
    let minimumCost = 0;
    let countRows = 1;
    let countCols = 1;
    this.allWeightsSorted.forEach((weight) => {
      if (weight[1] == "row") {
        countRows++;
        minimumCost += weight[0] * countCols;
      } else {
        countCols++;
        minimumCost += weight[0] * countRows;
      }
    });
    return minimumCost;
  }
}
