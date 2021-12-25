export class ChocolateBar {
  weightOfRows: Array<number>;
  weightOfCols: Array<number>;

  constructor(weightOfRows: Array<number>, weightOfCols: Array<number>) {
    this.weightOfRows = weightOfRows;
    this.weightOfCols = weightOfCols;
  }

  get numberOfRows(): number {
    return this.weightOfRows.length;
  }

  get numberOfCols(): number {
    return this.weightOfCols.length;
  }

  get sortedWeights(): Array<number> {
    const allWeights = this.weightOfRows.concat(this.weightOfCols);
    return allWeights.sort((a, b) => a - b);
  }
}
