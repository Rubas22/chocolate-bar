/**
 * Two posible orientations for edges
 *
 * @typedef {string} Orientation
 */
type Orientation = "row" | "col";

/**
 * Edge interface
 *
 * @interface {iEdge}
 */
interface iEdge {
  /**
   * Value of the edge weight
   */
  weight: number;
  /**
   * Wheter the edge belongs to a row or a column
   */
  orientation: Orientation;
}
