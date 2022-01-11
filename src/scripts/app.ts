let chocolateBarHeight: number = 0;
let chocolateBarWidth: number = 0;

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
    const weightOfRows: number[] = [];
    const weightOfCols: number[] = [];

    inputRows.forEach((input: { value: string }) =>
      weightOfRows.push(parseInt(input.value))
    );
    inputCols.forEach((input: { value: string }) =>
      weightOfCols.push(parseInt(input.value))
    );

    this.calculateMinimumCost(weightOfRows, weightOfCols);
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
  weightOfRows: number[],
  weightOfCols: number[]
): number {
  return 0;
}
