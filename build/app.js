"use strict";
var chocolateBarHeight = 0;
var chocolateBarWidth = 0;
let minimumCost;
window.onload = () => {
    const sizeForm = document.getElementById("size-form");
    const costsForm = document.getElementById("costs-form");
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let form = event.target;
        let height = form[0].value;
        let width = form[1].value;
        if (this.chocolateBarHeight != height || this.chocolateBarWidth != width) {
            this.setChocolateBarSize(height, width);
            this.deployChocolateBarContainer();
            this.resetMinimumCost();
        }
        else {
            window.alert("Size hasn't been changed, please select a new size");
        }
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const rowInputs = document.querySelectorAll('[id^="row-"]');
        const colInputs = document.querySelectorAll('[id^="col-"]');
        const rowEdgesWeights = [];
        const colEdgesWeights = [];
        rowInputs.forEach((input) => rowEdgesWeights.push(parseInt(input.value)));
        colInputs.forEach((input) => colEdgesWeights.push(parseInt(input.value)));
        this.calculateMinimumCost(rowEdgesWeights, colEdgesWeights);
        this.setMinimumCost();
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("reset", () => {
        this.resetMinimumCost();
    });
};
function setChocolateBarSize(height, width) {
    this.chocolateBarHeight = height;
    this.chocolateBarWidth = width;
}
function deployChocolateBarContainer() {
    this.deployChocolateBar();
    this.deployWeightInputs();
    this.unhideCalculationButtons();
}
function deployChocolateBar() {
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
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
function deployWeightInputs() {
    const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
    const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
    const numOfColEdges = this.chocolateBarWidth - 1;
    const numOfRowEdges = this.chocolateBarHeight - 1;
    if (colEdgesWeightsWraper) {
        colEdgesWeightsWraper.innerHTML = "";
        for (let i = 0; i < numOfColEdges; i++) {
            colEdgesWeightsWraper.innerHTML += `<input type='number' id='col-${i}' min='0' max='9999' required>`;
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
    if (rowEdgesWeightsWraper) {
        rowEdgesWeightsWraper.innerHTML = "";
        for (let i = 0; i < numOfRowEdges; i++) {
            rowEdgesWeightsWraper.innerHTML += `<input type='number' id='row-${i}' min='0' max='9999' required>`;
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
function unhideCalculationButtons() {
    const buttonsContainer = document.getElementById("calculation-buttons");
    if (buttonsContainer && buttonsContainer.hidden) {
        buttonsContainer.hidden = false;
    }
    else if (!buttonsContainer) {
        window.alert("Up! somenthing when wrong");
    }
}
function calculateMinimumCost(rowEdgesWeights, colEdgesWeights) {
    const chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
    this.minimumCost = chocolateBar.calculateMinimumCost();
}
function setMinimumCost() {
    const minCostSpan = document.getElementById("minimum-value");
    if (minCostSpan) {
        minCostSpan.innerText = this.minimumCost;
    }
}
function resetMinimumCost() {
    const minCostSpan = document.getElementById("minimum-value");
    if (minCostSpan) {
        minCostSpan.innerText = "";
        this.minimumCost = null;
    }
}
class ChocolateBar {
    constructor(rowEdgesWeights, colEdgesWeights) {
        this.rowEdgesWeights = rowEdgesWeights.map((rowEdge) => {
            return [rowEdge, "row"];
        });
        this.colEdgesWeights = colEdgesWeights.map((colEdge) => {
            return [colEdge, "col"];
        });
    }
    get allWeightsSorted() {
        const allWeights = [...this.rowEdgesWeights, ...this.colEdgesWeights];
        return allWeights.sort((a, b) => b[0] - a[0]);
    }
    calculateMinimumCost() {
        let minimumCost = 0;
        let countRows = 1;
        let countCols = 1;
        this.allWeightsSorted.forEach((weight) => {
            if (weight[1] == "row") {
                countRows++;
                minimumCost += weight[0] * countCols;
            }
            else {
                countCols++;
                minimumCost += weight[0] * countRows;
            }
        });
        return minimumCost;
    }
}
