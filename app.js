"use strict";
class Edge {
    constructor(weight, orientation) {
        this.weight = weight;
        this.orientation = orientation;
    }
}
class ChocolateBar {
    constructor(height = 0, width = 0) {
        this.rowEdges = [];
        this.colEdges = [];
        this.height = height;
        this.width = width;
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
    get sortedEdges() {
        const edges = [...this.rowEdges, ...this.colEdges];
        return edges.sort((edgeA, edgeB) => edgeB.weight - edgeA.weight);
    }
    reassignEdges(rowEdgesWeights, colEdgesWeights) {
        this.rowEdges = rowEdgesWeights.map((rowEdgeWeight) => {
            return new Edge(rowEdgeWeight, "row");
        });
        this.colEdges = colEdgesWeights.map((colEdgeWeight) => {
            return new Edge(colEdgeWeight, "col");
        });
    }
}
var chocolateBar = new ChocolateBar();
const ERROR_MESSAGE = "Ups! something went wrong. Page is going to be reload";
onload = () => {
    const sizeForm = document.getElementById("size-form");
    const costsForm = document.getElementById("costs-form");
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        this.unhideCalculationButtons();
    }, { once: true });
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const height = parseInt(sizeForm["height"].value);
        const width = parseInt(sizeForm["width"].value);
        if (this.chocolateBar.height == height &&
            this.chocolateBar.width == width) {
            alert("Size hasn't been changed, please select a new size");
            return;
        }
        this.chocolateBar = new ChocolateBar(height, width);
        this.deployChocolateBar();
        this.deployWeightInputs();
        this.resetMinimumCostSpan();
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
        this.chocolateBar.reassignEdges([], []);
        this.resetMinimumCostSpan();
    });
};
function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child.cloneNode(true)));
}
function deployChocolateBar() {
    const chocolateBar = document.getElementById("chocolate-bar");
    if (!chocolateBar) {
        this.manageError();
        return;
    }
    const piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const pieces = Array(this.chocolateBar.width).fill(piece);
    this.appendChildren(row, pieces);
    chocolateBar.innerHTML = "";
    const rows = Array(this.chocolateBar.height).fill(row);
    this.appendChildren(chocolateBar, rows);
}
function deployWeightInputs() {
    const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
    const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
    if (!rowEdgesWeightsWraper || !colEdgesWeightsWraper) {
        this.manageError();
        return;
    }
    const numOfRowEdges = this.chocolateBar.height - 1;
    const numOfColEdges = this.chocolateBar.width - 1;
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
    this.appendChildren(rowEdgesWeightsWraper, rowInputs);
    colEdgesWeightsWraper.innerHTML = "";
    this.appendChildren(colEdgesWeightsWraper, colInputs);
}
function manageError() {
    alert(ERROR_MESSAGE);
    location.reload();
}
function resetMinimumCostSpan() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        this.manageError();
        return;
    }
    minimumCostFigure.innerText = "";
}
function showMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        this.manageError();
        return;
    }
    minimumCostFigure.innerText = this.chocolateBar.minimumCost;
}
function unhideCalculationButtons() {
    const buttonsContainer = document.getElementById("calculation-buttons");
    if (!buttonsContainer) {
        this.manageError();
        return;
    }
    buttonsContainer.hidden = false;
}
