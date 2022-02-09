type Orientation = "row" | "col";

class Edge implements iEdge {
  weight: number;
  orientation: Orientation;
  constructor(weight: number, orientation: Orientation) {
    this.weight = weight;
    this.orientation = orientation;
  }
}
