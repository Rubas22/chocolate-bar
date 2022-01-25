"use strict";
var chocolateBarHeight = 0;
var chocolateBarWidth = 0;
let minimumCost;
const ERROR_MESSAGE = "Ups! somenthing went wrong. Page is going to be reload";
window.onload = () => {
    const sizeForm = document.getElementById("size-form");
    const costsForm = document.getElementById("costs-form");
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const height = sizeForm["height"].value;
        const width = sizeForm["width"].value;
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
        const rowInputs = document.getElementsByName("row");
        const colInputs = document.getElementsByName("col");
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
        this.manageError();
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
            colEdgesWeightsWraper.innerHTML += `<input type='number' name='col' min='0' max='9999' required>`;
        }
    }
    else {
        this.manageError();
    }
    if (rowEdgesWeightsWraper) {
        rowEdgesWeightsWraper.innerHTML = "";
        for (let i = 0; i < numOfRowEdges; i++) {
            rowEdgesWeightsWraper.innerHTML += `<input type='number' name='row' min='0' max='9999' required>`;
        }
    }
    else {
        this.manageError();
    }
}
function unhideCalculationButtons() {
    const buttonsContainer = document.getElementById("calculation-buttons");
    if (buttonsContainer) {
        buttonsContainer.hidden = false;
    }
    else {
        this.manageError();
    }
}
function calculateMinimumCost(rowEdgesWeights, colEdgesWeights) {
    const chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
    this.minimumCost = chocolateBar.minimumCost;
}
function showMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (minimumCostFigure) {
        minimumCostFigure.innerText = this.minimumCost;
    }
    else {
        this.manageError();
    }
}
function resetMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (minimumCostFigure) {
        minimumCostFigure.innerText = "";
        this.minimumCost = null;
    }
    else {
        this.manageError();
    }
}
function manageError() {
    window.alert(ERROR_MESSAGE);
    window.location.reload();
}
class ChocolateBar {
    constructor(rowEdgesWeights, colEdgesWeights) {
        const rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
            return new Edge(rowEdgeWeight, "row");
        });
        const colEdges = colEdgesWeights.map((colEdgeWeight) => {
            return new Edge(colEdgeWeight, "col");
        });
        this.edges = [...rowEdges, ...colEdges];
    }
    get sortedEdges() {
        return this.edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
    }
    get minimumCost() {
        let minimumCost = 0;
        let rowsCount = 1;
        let colsCount = 1;
        this.sortedEdges.forEach((edge) => {
            if (edge.orientation == "row") {
                rowsCount++;
                minimumCost += edge.weight * colsCount;
            }
            else if (edge.orientation == "col") {
                colsCount++;
                minimumCost += edge.weight * rowsCount;
            }
        });
        return minimumCost;
    }
}
class Edge {
    constructor(weight, orientation) {
        this.weight = weight;
        this.orientation = orientation;
    }
}
