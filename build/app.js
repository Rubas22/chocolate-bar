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
        const rowInputs = document.querySelectorAll('[id^="row-edge-weight-"]');
        const colInputs = document.querySelectorAll('[id^="col-edge-weight-"]');
        const rowEdgesWeights = [];
        const colEdgesWeights = [];
        rowInputs.forEach((input) => rowEdgesWeights.push(parseInt(input.value)));
        colInputs.forEach((input) => colEdgesWeights.push(parseInt(input.value)));
        this.calculateMinimumCost(rowEdgesWeights, colEdgesWeights);
        this.showMinimumCost();
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
            colEdgesWeightsWraper.innerHTML += `<input type='number' id='col-edge-weight-${i}' min='0' max='9999' required>`;
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
    if (rowEdgesWeightsWraper) {
        rowEdgesWeightsWraper.innerHTML = "";
        for (let i = 0; i < numOfRowEdges; i++) {
            rowEdgesWeightsWraper.innerHTML += `<input type='number' id='row-edge-weight-${i}' min='0' max='9999' required>`;
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
    this.minimumCost = chocolateBar.minimumCost;
}
function showMinimumCost() {
    const minimumValueSpan = document.getElementById("minimum-value");
    if (minimumValueSpan) {
        minimumValueSpan.innerText = this.minimumCost;
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
function resetMinimumCost() {
    const minimumValueSpan = document.getElementById("minimum-value");
    if (minimumValueSpan) {
        minimumValueSpan.innerText = "";
        this.minimumCost = null;
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
class ChocolateBar {
    constructor(rowEdgesWeights, colEdgesWeights) {
        this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
            return { weight: rowEdgeWeight, orientation: "row" };
        });
        this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
            return { weight: colEdgeWeight, orientation: "col" };
        });
    }
    get allEdgesSorted() {
        const allWeights = [...this.rowEdges, ...this.colEdges];
        return allWeights.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
    }
    get minimumCost() {
        let minimumCost = 0;
        let rowsCount = 1;
        let colsCount = 1;
        this.allEdgesSorted.forEach((edge) => {
            if (edge.orientation == "row") {
                rowsCount++;
                minimumCost += edge.weight * colsCount;
            }
            else {
                colsCount++;
                minimumCost += edge.weight * rowsCount;
            }
        });
        return minimumCost;
    }
}
