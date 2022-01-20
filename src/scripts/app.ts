// ts main file

// TO DO: decide wheter cost, weight or value
// TO DO: fix button borde
// TO DO: Improve funtionalities ??

/* GLOBAL VARIABLES */
var chocolateBarHeight: number = 0;
var chocolateBarWidth: number = 0;
let minimumCost: number;
const errorMessage: string =
  "Ups! somenthing went wrong. Page is going to be reload";

/* BUTTON ACTIONS */
window.onload = () => {
  const sizeForm = document.getElementById("size-form");
  const costsForm = document.getElementById("costs-form");

  sizeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    let form: any = event.target;
    let height: number = form[0].value;
    let width: number = form[1].value;
    if (this.chocolateBarHeight != height || this.chocolateBarWidth != width) {
      this.setChocolateBarSize(height, width);
      this.deployChocolateBarContainer();
      this.resetMinimumCost();
    } else {
      window.alert("Size hasn't been changed, please select a new size");
    }
  });

  costsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const rowInputs: any = document.querySelectorAll(
      '[id^="row-edge-weight-"]'
    );
    const colInputs: any = document.querySelectorAll(
      '[id^="col-edge-weight-"]'
    );
    const rowEdgesWeights: number[] = [];
    const colEdgesWeights: number[] = [];

    rowInputs.forEach((input: { value: string }) =>
      rowEdgesWeights.push(parseInt(input.value))
    );
    colInputs.forEach((input: { value: string }) =>
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
  if (chocolateBar) {
    chocolateBar.innerHTML = "";
    for (let i = 0; i < this.chocolateBarHeight; i++) {
      chocolateBar.innerHTML += "<div class='row'>" + row + "</div>";
    }
  } else {
    this.manageError();
  }
}

function deployWeightInputs(): void {
  const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
  const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
  const numOfColEdges = this.chocolateBarWidth - 1;
  const numOfRowEdges = this.chocolateBarHeight - 1;
  if (colEdgesWeightsWraper) {
    colEdgesWeightsWraper.innerHTML = "";
    for (let i = 0; i < numOfColEdges; i++) {
      colEdgesWeightsWraper.innerHTML += `<input type='number' id='col-edge-weight-${i}' min='0' max='9999' required>`;
    }
  } else {
    this.manageError();
  }
  if (rowEdgesWeightsWraper) {
    rowEdgesWeightsWraper.innerHTML = "";
    for (let i = 0; i < numOfRowEdges; i++) {
      rowEdgesWeightsWraper.innerHTML += `<input type='number' id='row-edge-weight-${i}' min='0' max='9999' required>`;
    }
  } else {
    this.manageError();
  }
}

function unhideCalculationButtons(): void {
  const buttonsContainer = document.getElementById("calculation-buttons");
  if (buttonsContainer && buttonsContainer.hidden) {
    buttonsContainer.hidden = false;
  } else if (!buttonsContainer) {
    this.manageError();
  }
}

function calculateMinimumCost(
  rowEdgesWeights: number[],
  colEdgesWeights: number[]
): void {
  const chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
  this.minimumCost = chocolateBar.minimumCost;
}

function showMinimumCost(): void {
  const minimumValueSpan = document.getElementById("minimum-value");
  if (minimumValueSpan) {
    minimumValueSpan.innerText = this.minimumCost;
  } else {
    this.manageError();
  }
}

function resetMinimumCost(): void {
  const minimumValueSpan = document.getElementById("minimum-value");
  if (minimumValueSpan) {
    minimumValueSpan.innerText = "";
    this.minimumCost = null;
  } else {
    this.manageError();
  }
}

function manageError(): void {
  window.alert(errorMessage);
  window.location.reload();
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
      if (edge.orientation == "row") {
        rowsCount++;
        minimumCost += edge.weight * colsCount;
      } else {
        colsCount++;
        minimumCost += edge.weight * rowsCount;
      }
    });
    return minimumCost;
  }
}

interface Edge {
  weight: number;
  orientation: "row" | "col";
}

class Edge implements Edge {
  weight: number;
  orientation: "row" | "col";
  constructor(weight: number, orientation: "row" | "col") {
    this.weight = weight;
    this.orientation = orientation;
  }
}
