// ts main file

// TO DO: decide beetwen cost and weight
// TO DO: fix button borde
// TO DO: create variable for error message ??

/* GLOBAL VARIABLES */
var chocolateBarHeight: number = 0;
var chocolateBarWidth: number = 0;
let minimumCost: number;

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
    const rowInputs: any = document.querySelectorAll('[id^="row-edge-weight-"]');
    const colInputs: any = document.querySelectorAll('[id^="col-edge-weight-"]');
    const rowEdgesWeights: number[] = [];
    const colEdgesWeights: number[] = [];

    rowInputs.forEach((input: { value: string }) =>
      rowEdgesWeights.push(parseInt(input.value))
    );
    colInputs.forEach((input: { value: string }) =>
      colEdgesWeights.push(parseInt(input.value))
    );
    this.calculateMinimumCost(rowEdgesWeights, colEdgesWeights);
    this.setMinimumCost();
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
    window.alert("Up! somenthing when wrong");
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
    window.alert("Up! somenthing when wrong");
  }
  if (rowEdgesWeightsWraper) {
    rowEdgesWeightsWraper.innerHTML = "";
    for (let i = 0; i < numOfRowEdges; i++) {
      rowEdgesWeightsWraper.innerHTML += `<input type='number' id='row-edge-weight-${i}' min='0' max='9999' required>`;
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
}

function unhideCalculationButtons(): void {
  const buttonsContainer = document.getElementById("calculation-buttons");
  if (buttonsContainer && buttonsContainer.hidden) {
    buttonsContainer.hidden = false;
  } else if (!buttonsContainer) {
    window.alert("Up! somenthing when wrong");
  }
}

function calculateMinimumCost(
  rowEdgesWeights: number[],
  colEdgesWeights: number[]
): void {
  const chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
  this.minimumCost = chocolateBar.calculateMinimumCost();
}

function setMinimumCost(): void {
  const minCostSpan = document.getElementById("minimum-value");
  if (minCostSpan) {
    minCostSpan.innerText = this.minimumCost;
  }
}

function resetMinimumCost(): void {
  const minCostSpan = document.getElementById("minimum-value");
  if (minCostSpan) {
    minCostSpan.innerText = "";
    this.minimumCost = null;
  }
}

/* MODELS */
class ChocolateBar {
  rowEdgesWeights: [number, "row"][];
  colEdgesWeights: [number, "col"][];

  constructor(rowEdgesWeights: number[], colEdgesWeights: number[]) {
    this.rowEdgesWeights = rowEdgesWeights.map((rowEdge) => {
      return [rowEdge, "row"];
    });
    this.colEdgesWeights = colEdgesWeights.map((colEdge) => {
      return [colEdge, "col"];
    });
  }

  get allWeightsSorted(): [number, string][] {
    const allWeights = [...this.rowEdgesWeights, ...this.colEdgesWeights];
    return allWeights.sort((a, b) => b[0] - a[0]);
  }

  calculateMinimumCost(): number {
    let minimumCost = 0;
    let countRows = 1;
    let countCols = 1;
    this.allWeightsSorted.forEach((weight) => {
      if (weight[1] == "row") {
        countRows++;
        minimumCost += weight[0] * countCols;
      } else {
        countCols++;
        minimumCost += weight[0] * countRows;
      }
    });
    return minimumCost;
  }
}
