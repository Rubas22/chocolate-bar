"use strict";
class Edge {
    constructor(weight, orientation) {
        this.weight = weight;
        this.orientation = orientation;
    }
}
class ChocolateBar {
    constructor() {
        this.height = 0;
        this.width = 0;
        this.rowEdges = [];
        this.colEdges = [];
    }
    resize(height, width) {
        this.height = height;
        this.width = width;
    }
    reassignEdges(rowEdgesWeights, colEdgesWeights) {
        this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
            return new Edge(rowEdgeWeight, "row");
        });
        this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
            return new Edge(colEdgeWeight, "col");
        });
    }
    get sortedEdges() {
        const edges = [...this.rowEdges, ...this.colEdges];
        return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
    }
    get minimumCost() {
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
var chocolateBar = new ChocolateBar();
const ERROR_MESSAGE = "Ups! something went wrong. Page is going to be reload";
onload = () => {
    const sizeForm = document.getElementById("size-form");
    const costsForm = document.getElementById("costs-form");
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const height = parseInt(sizeForm["height"].value);
        const width = parseInt(sizeForm["width"].value);
        if (this.chocolateBar.height == height &&
            this.chocolateBar.width == width) {
            alert("Size hasn't been changed, please select a new size");
            return;
        }
        chocolateBar.resize(height, width);
        this.deployChocolateBarContainer();
        this.resetMinimumCost();
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const rowInputs = document.getElementsByName("row");
        const colInputs = document.getElementsByName("col");
        const rowEdgesWeights = [];
        const colEdgesWeights = [];
        rowInputs.forEach((input) => rowEdgesWeights.push(parseInt(input.value)));
        colInputs.forEach((input) => colEdgesWeights.push(parseInt(input.value)));
        this.chocolateBar.reassignEdges(rowEdgesWeights, colEdgesWeights);
        this.showMinimumCost();
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("reset", () => {
        this.resetMinimumCost();
    });
};
function deployChocolateBarContainer() {
    this.deployChocolateBar();
    this.deployWeightInputs();
    this.unhideCalculationButtons();
}
function deployChocolateBar() {
    const chocolateBar = document.getElementById("chocolate-bar");
    if (!chocolateBar) {
        this.manageError();
        return;
    }
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    const pieces = Array(this.chocolateBar.width).fill(piece);
    this.appendChildren(row, pieces);
    chocolateBar.innerHTML = "";
    const rows = Array(this.chocolateBar.height).fill(row);
    this.appendChildren(chocolateBar, rows);
}
function deployWeightInputs() {
    const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
    const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
    if (!colEdgesWeightsWraper || !rowEdgesWeightsWraper) {
        this.manageError();
        return;
    }
    const numOfColEdges = this.chocolateBar.width - 1;
    const numOfRowEdges = this.chocolateBar.height - 1;
    const colInput = document.createElement("input");
    const rowInput = document.createElement("input");
    const properties = {
        type: "number",
        min: 0,
        max: 9999,
        required: true,
    };
    colInput.setAttribute("name", "col");
    rowInput.setAttribute("name", "row");
    Object.assign(colInput, properties);
    Object.assign(rowInput, properties);
    const colInputs = Array(numOfColEdges).fill(colInput);
    const rowInputs = Array(numOfRowEdges).fill(rowInput);
    colEdgesWeightsWraper.innerHTML = "";
    this.appendChildren(colEdgesWeightsWraper, colInputs);
    rowEdgesWeightsWraper.innerHTML = "";
    this.appendChildren(rowEdgesWeightsWraper, rowInputs);
}
function unhideCalculationButtons() {
    const buttonsContainer = document.getElementById("calculation-buttons");
    if (!buttonsContainer) {
        this.manageError();
        return;
    }
    buttonsContainer.hidden = false;
}
function showMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        this.manageError();
        return;
    }
    minimumCostFigure.innerText = this.chocolateBar.minimumCost;
}
function resetMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        this.manageError();
        return;
    }
    minimumCostFigure.innerText = "";
}
function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child.cloneNode(true)));
}
function manageError() {
    alert(ERROR_MESSAGE);
    location.reload();
}
