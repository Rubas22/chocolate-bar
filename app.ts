// ts main file

/* GLOBAL VARIABLES */
var chocolateBarHeight: number = 0;
var chocolateBarWidth: number = 0;
let minimumCost: number = 0;
const ERROR_MESSAGE: string =
  "Ups! somenthing went wrong. Page is going to be reload";

/* BUTTON ACTIONS */
onload = () => {
  const sizeForm = document.getElementById("size-form") as HTMLFormElement;
  const costsForm = document.getElementById("costs-form");

  sizeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const height: number = sizeForm["height"].value;
    const width: number = sizeForm["width"].value;
    if (this.chocolateBarHeight == height && this.chocolateBarWidth == width) {
      alert("Size hasn't been changed, please select a new size");
      return;
    }
    this.setChocolateBarSize(height, width);
    this.deployChocolateBarContainer();
    this.resetMinimumCost();
  });

  costsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const rowInputs: any = document.getElementsByName("row");
    const colInputs: any = document.getElementsByName("col");
    const rowEdgesWeights: number[] = [];
    const colEdgesWeights: number[] = [];

    rowInputs.forEach((input: HTMLInputElement) =>
      rowEdgesWeights.push(parseInt(input.value))
    );
    colInputs.forEach((input: HTMLInputElement) =>
      colEdgesWeights.push(parseInt(input.value))
    );
    this.calculateMinimumCost(rowEdgesWeights, colEdgesWeights);
    this.showMinimumCost();
  });

  costsForm?.addEventListener("reset", () => {
    this.resetMinimumCost();
  });
};

/* FUNCTIONS */
function setChocolateBarSize(height: number, width: number): void {
  this.chocolateBarHeight = height;
  this.chocolateBarWidth = width;
}

function deployChocolateBarContainer(): void {
  this.deployChocolateBar();
  this.deployWeightInputs();
  this.unhideCalculationButtons();
}

function deployChocolateBar(): void {
  const chocolateBar = document.getElementById("chocolate-bar");
  let row = "";
  for (let i = 0; i < this.chocolateBarWidth; i++) {
    row += "<div class='piece'></div>";
  }
  if (!chocolateBar) {
    this.manageError();
    return;
  }
  chocolateBar.innerHTML = "";
  for (let i = 0; i < this.chocolateBarHeight; i++) {
    chocolateBar.innerHTML += "<div class='row'>" + row + "</div>";
  }
}

function deployWeightInputs(): void {
  const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
  const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
  const numOfColEdges = this.chocolateBarWidth - 1;
  const numOfRowEdges = this.chocolateBarHeight - 1;
  if (!colEdgesWeightsWraper || !rowEdgesWeightsWraper) {
    this.manageError();
    return;
  }
  colEdgesWeightsWraper.innerHTML = "";
  for (let i = 0; i < numOfColEdges; i++) {
    colEdgesWeightsWraper.innerHTML += `<input type='number' name='col' min='0' max='9999' required>`;
  }
  rowEdgesWeightsWraper.innerHTML = "";
  for (let i = 0; i < numOfRowEdges; i++) {
    rowEdgesWeightsWraper.innerHTML += `<input type='number' name='row' min='0' max='9999' required>`;
  }
}

function unhideCalculationButtons(): void {
  const buttonsContainer = document.getElementById("calculation-buttons");
  if (!buttonsContainer) {
    this.manageError();
    return;
  }
  buttonsContainer.hidden = false;
}

function calculateMinimumCost(
  rowEdgesWeights: number[],
  colEdgesWeights: number[]
): void {
  const chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
  minimumCost = chocolateBar.minimumCost;
}

function showMinimumCost(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    this.manageError();
    return;
  }
  minimumCostFigure.innerText = minimumCost.toString();
}

function resetMinimumCost(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    this.manageError();
    return;
  }
  minimumCostFigure.innerText = "";
  minimumCost = 0;
}

function manageError(): void {
  alert(ERROR_MESSAGE);
  location.reload();
}

/* MODELS */
class ChocolateBar {
  edges: Edge[];
  constructor(rowEdgesWeights: number[], colEdgesWeights: number[]) {
    const rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
      return new Edge(rowEdgeWeight, "row");
    });
    const colEdges = colEdgesWeights.map((colEdgeWeight) => {
      return new Edge(colEdgeWeight, "col");
    });
    this.edges = [...rowEdges, ...colEdges];
  }

  get sortedEdges(): Edge[] {
    return this.edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
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

class Edge {
  weight: number;
  orientation: Orientation;
  constructor(weight: number, orientation: Orientation) {
    this.weight = weight;
    this.orientation = orientation;
  }
}

type Orientation = "row" | "col";
