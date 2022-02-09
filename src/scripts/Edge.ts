type Orientation = "row" | "col";

class Edge {
  weight: number;
  orientation: Orientation;
  constructor(weight: number, orientation: Orientation) {
    this.weight = weight;
    this.orientation = orientation;
  }
}
