interface iChocolateBar {
  rowEdges: iEdge[];
  colEdges: iEdge[];
  get height(): number;
  get width(): number;
  get minimumCost(): number;
  get sortedEdges(): iEdge[];
}
