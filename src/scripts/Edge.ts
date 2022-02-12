/**
 * Edge object template
 * 
 * @class {Edge}
 * @implements {iEdge}
 */
class Edge implements iEdge {
  weight: number;
  orientation: Orientation;
  /**
   * The properties {@weight} and {@orientation} are directly input 
   * 
   * @construcs
   * @param weight - Value of the edge weight
   * @param orientation - Value of the orientation
   */
  constructor(weight: number, orientation: Orientation) {
    this.weight = weight;
    this.orientation = orientation;
  }
}
