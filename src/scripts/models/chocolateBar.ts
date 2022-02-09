interface iChocolateBar {
  height: number;
  width: number;
  rowEdges: Edge[];
  colEdges: Edge[];
  get minimumCost(): number;
  get sortedEdges(): Edge[];
  reassignEdges(rowEdgesWeights: number[], colEdgesWeights: number[]): void;
}
