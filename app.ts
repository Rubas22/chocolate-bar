// ts main file

/* MODELS */
type Orientation = "row" | "col";

class Edge {
  weight: number;
  orientation: Orientation;
  constructor(weight: number, orientation: Orientation) {
    this.weight = weight;
    this.orientation = orientation;
  }
}

class ChocolateBar {
  height: number = 0;
  width: number = 0;
  rowEdges: Edge[] = [];
  colEdges: Edge[] = [];

  resize(height: number, width: number): void {
    this.height = height;
    this.width = width;
  }

  reassignEdges(rowEdgesWeights: number[], colEdgesWeights: number[]) {
    this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
      return new Edge(rowEdgeWeight, "row");
    });
    this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
      return new Edge(colEdgeWeight, "col");
    });
  }

  get sortedEdges(): Edge[] {
    const edges = [...this.rowEdges, ...this.colEdges];
    return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
  }

  get minimumCost(): number {
    let minimumCost = 0;
    let rowsCount = 1;
    let colsCount = 1;
    this.sortedEdges.forEach((edge) => {
      switch (edge.orientation) {
        case "row":
          rowsCount++;
          minimumCost += edge.weight * colsCount;
          break;
        case "col":
          colsCount++;
          minimumCost += edge.weight * rowsCount;
          break;
      }
    });
    return minimumCost;
  }
}

/* GLOBAL VARIABLES */
var chocolateBar = new ChocolateBar();
const ERROR_MESSAGE: string =
  "Ups! something went wrong. Page is going to be reload";

/* BUTTON ACTIONS */
onload = () => {
  const sizeForm = document.getElementById("size-form") as HTMLFormElement;
  const costsForm = document.getElementById("costs-form");

  sizeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const height: number = parseInt(sizeForm["height"].value);
    const width: number = parseInt(sizeForm["width"].value);
    if (
      this.chocolateBar.height == height &&
      this.chocolateBar.width == width
    ) {
      alert("Size hasn't been changed, please select a new size");
      return;
    }
    chocolateBar.resize(height, width);
    this.deployChocolateBarContainer();
    this.resetMinimumCost();
  });

  costsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const rowInputs: NodeListOf<HTMLInputElement> = document.getElementsByName(
      "row"
    ) as NodeListOf<HTMLInputElement>;
    const colInputs: NodeListOf<HTMLInputElement> = document.getElementsByName(
      "col"
    ) as NodeListOf<HTMLInputElement>;
    const rowEdgesWeights: number[] = [];
    const colEdgesWeights: number[] = [];

    rowInputs.forEach((input: HTMLInputElement) =>
      rowEdgesWeights.push(parseInt(input.value))
    );
    colInputs.forEach((input: HTMLInputElement) =>
      colEdgesWeights.push(parseInt(input.value))
    );
    this.chocolateBar.reassignEdges(rowEdgesWeights, colEdgesWeights);
    this.showMinimumCost();
  });

  costsForm?.addEventListener("reset", () => {
    this.resetMinimumCost();
  });
};

/* FUNCTIONS */

function deployChocolateBarContainer(): void {
  this.deployChocolateBar();
  this.deployWeightInputs();
  this.unhideCalculationButtons();
}

function deployChocolateBar(): void {
  const chocolateBar = document.getElementById("chocolate-bar");
  if (!chocolateBar) {
    this.manageError();
    return;
  }

  const piece = document.createElement("div");
  piece.setAttribute("class", "piece");

  const row = document.createElement("div");
  row.setAttribute("class", "row");

  const pieces = Array(this.chocolateBar.width).fill(piece);
  this.appendChildren(row, pieces);

  chocolateBar.innerHTML = "";
  const rows = Array(this.chocolateBar.height).fill(row);
  this.appendChildren(chocolateBar, rows);
}

function deployWeightInputs(): void {
  const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
  const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
  if (!rowEdgesWeightsWraper || !colEdgesWeightsWraper) {
    this.manageError();
    return;
  }

  const numOfRowEdges = this.chocolateBar.height - 1;
  const numOfColEdges = this.chocolateBar.width - 1;
  const rowInput = document.createElement("input");
  const colInput = document.createElement("input");
  const properties = {
    type: "number",
    min: 0,
    max: 9999,
    required: true,
  };
  rowInput.setAttribute("name", "row");
  colInput.setAttribute("name", "col");
  Object.assign(rowInput, properties);
  Object.assign(colInput, properties);

  const rowInputs = Array(numOfRowEdges).fill(rowInput);
  const colInputs = Array(numOfColEdges).fill(colInput);

  rowEdgesWeightsWraper.innerHTML = "";
  this.appendChildren(rowEdgesWeightsWraper, rowInputs);

  colEdgesWeightsWraper.innerHTML = "";
  this.appendChildren(colEdgesWeightsWraper, colInputs);
}

function unhideCalculationButtons(): void {
  const buttonsContainer = document.getElementById("calculation-buttons");
  if (!buttonsContainer) {
    this.manageError();
    return;
  }
  buttonsContainer.hidden = false;
}

function showMinimumCost(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    this.manageError();
    return;
  }
  minimumCostFigure.innerText = this.chocolateBar.minimumCost;
}

function resetMinimumCost(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    this.manageError();
    return;
  }
  minimumCostFigure.innerText = "";
}

function appendChildren(parent: HTMLElement, children: HTMLElement[]): void {
  children.forEach((child) => parent.appendChild(child.cloneNode(true)));
}

function manageError(): void {
  alert(ERROR_MESSAGE);
  location.reload();
}
