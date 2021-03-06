"use strict";
let chocolateBar = new ChocolateBar();
let height = 0;
let width = 0;
let rowEdgesWeights;
let colEdgesWeights;
const ERROR_MESSAGE = "Ups! something went wrong. Page is going to be reload";
onload = () => {
    const sizeForm = document.getElementById("size-form");
    const costsForm = document.getElementById("costs-form");
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        unhideCalculationButtons();
    }, { once: true });
    sizeForm === null || sizeForm === void 0 ? void 0 : sizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        height = parseInt(sizeForm["height"].value);
        width = parseInt(sizeForm["width"].value);
        if (chocolateBar.height == height && chocolateBar.width == width) {
            alert("Size hasn't been changed, please select a new size");
            return;
        }
        restarChocolateBar();
        deployChocolateBar();
        deployWeightInputs();
        resetMinimumCostSpan();
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const rowInputs = document.getElementsByName("row");
        const colInputs = document.getElementsByName("col");
        rowEdgesWeights = [];
        colEdgesWeights = [];
        rowInputs.forEach((input) => rowEdgesWeights.push(parseInt(input.value)));
        colInputs.forEach((input) => colEdgesWeights.push(parseInt(input.value)));
        chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
        showMinimumCost();
    });
    costsForm === null || costsForm === void 0 ? void 0 : costsForm.addEventListener("reset", () => {
        restarChocolateBar();
        resetMinimumCostSpan();
    });
};
function appendChildren(parent, children) {
    children.forEach((child) => parent.appendChild(child.cloneNode(true)));
}
function deployChocolateBar() {
    const chocolateBarDiv = document.getElementById("chocolate-bar");
    if (!chocolateBarDiv) {
        manageError();
        return;
    }
    const piece = document.createElement("div");
    piece.setAttribute("class", "piece");
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    const pieces = Array(width).fill(piece);
    appendChildren(row, pieces);
    chocolateBarDiv.innerHTML = "";
    const rows = Array(height).fill(row);
    appendChildren(chocolateBarDiv, rows);
}
function deployWeightInputs() {
    const rowEdgesWeightsWraper = document.getElementById("row-edges-weights");
    const colEdgesWeightsWraper = document.getElementById("col-edges-weights");
    if (!rowEdgesWeightsWraper || !colEdgesWeightsWraper) {
        manageError();
        return;
    }
    const numOfRowEdges = height - 1;
    const numOfColEdges = width - 1;
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
function manageError() {
    alert(ERROR_MESSAGE);
    location.reload();
}
function resetMinimumCostSpan() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        manageError();
        return;
    }
    minimumCostFigure.innerText = "";
}
function restarChocolateBar() {
    rowEdgesWeights = Array(height - 1).fill(NaN);
    colEdgesWeights = Array(width - 1).fill(NaN);
    chocolateBar = new ChocolateBar(rowEdgesWeights, colEdgesWeights);
}
function showMinimumCost() {
    const minimumCostFigure = document.getElementById("minimum-cost-figure");
    if (!minimumCostFigure) {
        manageError();
        return;
    }
    minimumCostFigure.innerText = chocolateBar.minimumCost.toString();
}
function unhideCalculationButtons() {
    const buttonsContainer = document.getElementById("calculation-buttons");
    if (!buttonsContainer) {
        manageError();
        return;
    }
    buttonsContainer.hidden = false;
}
