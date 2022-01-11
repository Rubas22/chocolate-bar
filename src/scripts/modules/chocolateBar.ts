export class ChocolateBar {
  weightRowEdges: Array<number>;
  weightColEdges: Array<number>;

  constructor(weightRowEdges: Array<number>, weightColEdges: Array<number>) {
    this.weightRowEdges = weightRowEdges;
    this.weightColEdges = weightColEdges;
  }

  get numHorizontalEdges(): number {
    return this.weightRowEdges.length;
  }

  get numVerticalEdges(): number {
    return this.weightColEdges.length;
  }

  calculateMinimumCost(): number {
    let minimumCost = 0;
    let rowEdges = this.weightRowEdges;
    let colEdges = this.weightColEdges;
    let maxRowValue = Math.max(...rowEdges);
    let maxColValue = Math.max(...colEdges);
    let numHorizontalCuts = 0;
    let numVerticalCuts = 0;
    let previousNumHorizontalEdges = this.numHorizontalEdges;
    let previousNumVerticalEdges = this.numVerticalEdges;
    let numOfMaxRows: number;
    let numOfMaxCols: number;
    while (rowEdges.length > 0 || colEdges.length > 0) {
      if (maxRowValue >= maxColValue) {
        rowEdges = rowEdges.filter((value) => {
          return value < maxRowValue;
        });
        numOfMaxRows = previousNumHorizontalEdges - rowEdges.length;
        if (numHorizontalCuts < this.numHorizontalEdges) {
          numHorizontalCuts += numOfMaxRows;
        }
        minimumCost += maxRowValue * numOfMaxRows * (numVerticalCuts + 1);
        previousNumHorizontalEdges = rowEdges.length;
        maxRowValue = Math.max(...rowEdges);
      } else {
        colEdges = colEdges.filter((value) => {
          return value < maxColValue;
        });
        numOfMaxCols = previousNumVerticalEdges - colEdges.length;
        if (numVerticalCuts < this.numVerticalEdges) {
          numVerticalCuts += numOfMaxCols;
        }
        minimumCost += maxColValue * numOfMaxCols * (numHorizontalCuts + 1);
        previousNumVerticalEdges = colEdges.length;
        maxColValue = Math.max(...colEdges);
      }
    }
    return minimumCost;
  }
}
