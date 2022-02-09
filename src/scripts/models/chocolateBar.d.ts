interface iChocolateBar {
  height: number;
  width: number;
  rowEdges: iEdge[];
  colEdges: iEdge[];
  get minimumCost(): number;
  get sortedEdges(): iEdge[];
  reassignEdges(rowEdgesWeights: number[], colEdgesWeights: number[]): void;
}
