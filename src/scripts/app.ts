let chocolateBar = new ChocolateBar();
const ERROR_MESSAGE: string =
  "Ups! something went wrong. Page is going to be reload";

onload = () => {
  const sizeForm = document.getElementById("size-form") as HTMLFormElement;
  const costsForm = document.getElementById("costs-form");

  sizeForm?.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      unhideCalculationButtons();
    },
    { once: true }
  );

  sizeForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const height: number = parseInt(sizeForm["height"].value);
    const width: number = parseInt(sizeForm["width"].value);
    if (chocolateBar.height == height && chocolateBar.width == width) {
      alert("Size hasn't been changed, please select a new size");
      return;
    }
    chocolateBar = new ChocolateBar(height, width);
    deployChocolateBar();
    deployWeightInputs();
    resetMinimumCostSpan();
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
    chocolateBar.reassignEdges(rowEdgesWeights, colEdgesWeights);
    showMinimumCost();
  });

  costsForm?.addEventListener("reset", () => {
    chocolateBar.reassignEdges([], []);
    resetMinimumCostSpan();
  });
};

function appendChildren(parent: HTMLElement, children: HTMLElement[]): void {
  children.forEach((child) => parent.appendChild(child.cloneNode(true)));
}

function deployChocolateBar(): void {
  const chocolateBarDiv = document.getElementById("chocolate-bar");
  if (!chocolateBarDiv) {
    manageError();
    return;
  }

  const piece = document.createElement("div");
  piece.setAttribute("class", "piece");

  const row = document.createElement("div");
  row.setAttribute("class", "row");

  const pieces = Array(chocolateBar.width).fill(piece);
  appendChildren(row, pieces);

  chocolateBarDiv.innerHTML = "";
  const rows = Array(chocolateBar.height).fill(row);
  appendChildren(chocolateBarDiv, rows);
}

function deployWeightInputs(): void {
  const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
  const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
  if (!rowEdgesWeightsWraper || !colEdgesWeightsWraper) {
    manageError();
    return;
  }

  const numOfRowEdges = chocolateBar.height - 1;
  const numOfColEdges = chocolateBar.width - 1;
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
  appendChildren(rowEdgesWeightsWraper, rowInputs);

  colEdgesWeightsWraper.innerHTML = "";
  appendChildren(colEdgesWeightsWraper, colInputs);
}

function manageError(): void {
  alert(ERROR_MESSAGE);
  location.reload();
}

function resetMinimumCostSpan(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    manageError();
    return;
  }
  minimumCostFigure.innerText = "";
}

function showMinimumCost(): void {
  const minimumCostFigure = document.getElementById("minimum-cost-figure");
  if (!minimumCostFigure) {
    manageError();
    return;
  }
  minimumCostFigure.innerText = chocolateBar.minimumCost.toString();
}

function unhideCalculationButtons(): void {
  const buttonsContainer = document.getElementById("calculation-buttons");
  if (!buttonsContainer) {
    manageError();
    return;
  }
  buttonsContainer.hidden = false;
}
