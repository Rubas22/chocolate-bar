let chocolateBarHeight: number = 0;
let chocolateBarWidth: number = 0;
let minimumCost: number;

window.onload = () => {
  const inputSizeForm = document.getElementById("set-size-bar");
  let inputDisplayForm = document.getElementById("cbd-form");

  inputSizeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    let form: any = event.target;
    let height: number = form[0].value;
    let width: number = form[1].value;
    this.setChocolateBarSize(height, width);
    this.deployChocolateBar();
  });

  inputDisplayForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputRows: any = document.querySelectorAll("#row");
    const inputCols: any = document.querySelectorAll("#col");
    const weightRowEdges: number[] = [];
    const weightColEdges: number[] = [];

    inputRows.forEach((input: { value: string }) =>
      weightRowEdges.push(parseInt(input.value))
    );
    inputCols.forEach((input: { value: string }) =>
      weightColEdges.push(parseInt(input.value))
    );

    this.calculateMinimumCost(weightRowEdges, weightColEdges);
  });
};

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
  const chocBarDiv = document.getElementById("cbd-container");
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
  const colInputsDiv = document.getElementById("col-inputs");
  const rowInputsDiv = document.getElementById("row-inputs");
  const numColInputs = this.chocolateBarWidth - 1;
  const numRowInputs = this.chocolateBarHeight - 1;
  if (colInputsDiv) {
    colInputsDiv.innerHTML = "";
    for (let i = 0; i < numColInputs; i++) {
      colInputsDiv.innerHTML +=
        "<input type='number' id='col' min='0' max='9999' required>";
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
  if (rowInputsDiv) {
    rowInputsDiv.innerHTML = "";
    for (let i = 0; i < numRowInputs; i++) {
      rowInputsDiv.innerHTML +=
        "<input type='number' id='row' min='0' max='9999' required>";
    }
  } else {
    window.alert("Up! somenthing when wrong");
  }
}

function unhideCalculateButton(): void {
  const divBottom = document.getElementById("cbc-div");
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

class ChocolateBar {
  weightRowEdges: Array<number>;
  weightColEdges: Array<number>;

  constructor(weightRowEdges: Array<number>, weightColEdges: Array<number>) {
    this.weightRowEdges = weightRowEdges;
    this.weightColEdges = weightColEdges;
  }

  get numHorizontalEdges(): number {
    return this.weightRowEdges.length;
  }

  get numVerticalEdges(): number {
    return this.weightColEdges.length;
  }

  calculateMinimumCost(): number {
    let minimumCost = 0;
    let rowEdges = this.weightRowEdges;
    let colEdges = this.weightColEdges;
    let maxRowValue = Math.max(...rowEdges);
    let maxColValue = Math.max(...colEdges);
    let numHorizontalCuts = 0;
    let numVerticalCuts = 0;
    let previousNumHorizontalEdges = this.numHorizontalEdges;
    let previousNumVerticalEdges = this.numVerticalEdges;
    let numOfMaxRows: number;
    let numOfMaxCols: number;
    while (rowEdges.length > 0 || colEdges.length > 0) {
      if (maxRowValue >= maxColValue) {
        rowEdges = rowEdges.filter((value) => {
          return value < maxRowValue;
        });
        numOfMaxRows = previousNumHorizontalEdges - rowEdges.length;
        if (numHorizontalCuts < this.numHorizontalEdges) {
          numHorizontalCuts += numOfMaxRows;
        }
        minimumCost += maxRowValue * numOfMaxRows * (numVerticalCuts + 1);
        previousNumHorizontalEdges = rowEdges.length;
        maxRowValue = Math.max(...rowEdges);
      } else {
        colEdges = colEdges.filter((value) => {
          return value < maxColValue;
        });
        numOfMaxCols = previousNumVerticalEdges - colEdges.length;
        if (numVerticalCuts < this.numVerticalEdges) {
          numVerticalCuts += numOfMaxCols;
        }
        minimumCost += maxColValue * numOfMaxCols * (numHorizontalCuts + 1);
        previousNumVerticalEdges = colEdges.length;
        maxColValue = Math.max(...colEdges);
      }
    }
    return minimumCost;
  }
}
