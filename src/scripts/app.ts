// ts main file

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
      this.deployChocolateBar();
      this.resetMinimumCost();
    } else {
      window.alert("Size hasn't been changed, please select a new size");
    }
  });

  costsForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const rowInputs: any = document.querySelectorAll('[id^="row-"]');
    const colInputs: any = document.querySelectorAll('[id^="col-"]');
    const weightRowEdges: number[] = [];
    const weightColEdges: number[] = [];

    rowInputs.forEach((input: { value: string }) =>
      weightRowEdges.push(parseInt(input.value))
    );
    colInputs.forEach((input: { value: string }) =>
      weightColEdges.push(parseInt(input.value))
    );

    this.calculateMinimumCost(weightRowEdges, weightColEdges);
    this.setMinCostText();
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

function deployChocolateBar(): void {
  this.showChocolateBar();
  this.setWeightInputs();
  this.unhideCalculateButton();
}

function showChocolateBar(): void {
  const chocBarDiv = document.getElementById("chocolate-bar");
  let row = "";
  for (let i = 0; i < this.chocolateBarWidth; i++) {
    row += "<div class='piece'></div>";
  }
  if (chocBarDiv) {
    chocBarDiv.innerHTML = "";
    for (let i = 0; i < this.chocolateBarHeight; i++) {
      chocBarDiv.innerHTML += "<div class='row'>" + row + "</div>";
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
}

function setWeightInputs(): void {
  const colInputsDiv = document.getElementById("cols-wraper");
  const rowInputsDiv = document.getElementById("rows-wraper");
  const numColInputs = this.chocolateBarWidth - 1;
  const numRowInputs = this.chocolateBarHeight - 1;
  if (colInputsDiv) {
    colInputsDiv.innerHTML = "";
    for (let i = 0; i < numColInputs; i++) {
      colInputsDiv.innerHTML +=
      `<input type='number' id='col-${i}' min='0' max='9999' required>`;
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
  if (rowInputsDiv) {
    rowInputsDiv.innerHTML = "";
    for (let i = 0; i < numRowInputs; i++) {
      rowInputsDiv.innerHTML +=
      `<input type='number' id='row-${i}' min='0' max='9999' required>`;
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
}

function unhideCalculateButton(): void {
  const divBottom = document.getElementById("calculation-options");
  if (divBottom && divBottom.hidden) {
    divBottom.hidden = false;
  } else if (!divBottom) {
    window.alert("Up! somenthing when wrong");
  }
}

function calculateMinimumCost(
  weightRowEdges: number[],
  weightColEdges: number[]
): void {
  const chocolateBar = new ChocolateBar(weightRowEdges, weightColEdges);
  this.minimumCost = chocolateBar.calculateMinimumCost();
}

function setMinCostText(): void {
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
  weightRowEdges: [number, "row"][];
  weightColEdges: [number, "col"][];

  constructor(weightRowEdges: number[], weightColEdges: number[]) {
    this.weightRowEdges = weightRowEdges.map((rowEdge) => {
      return [rowEdge, "row"];
    });
    this.weightColEdges = weightColEdges.map((colEdge) => {
      return [colEdge, "col"];
    });
  }

  get allWeightsSorted(): [number, string][] {
    const allWeights = [...this.weightRowEdges, ...this.weightColEdges];
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
