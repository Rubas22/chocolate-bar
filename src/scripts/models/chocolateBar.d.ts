/**
 * Chocolate bar interface
 * 
 * @interface {iChocolateBar} 
 */
interface iChocolateBar {
  /**
   * Array with the row edges
   */
  rowEdges: iEdge[];
  /**
   * Array with the column edges
   */
  colEdges: iEdge[];
  /**
   * Height of the chocolate bar
   */
  get height(): number;
  /**
   * Width of the chocolate bar 
   */
  get width(): number;
  /**
   * The minimum cost of all posibles ways of cutting the chocolate bar
   */
  get minimumCost(): number;
  /**
   * An array with all the edges sorted by weight
   */
  get sortedEdges(): iEdge[];
}
