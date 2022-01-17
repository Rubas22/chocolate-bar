"use strict";
var chocolateBarHeight = 0;
var chocolateBarWidth = 0;
let minimumCost;
window.onload = () => {
    const inputSizeForm = document.getElementById("set-size-bar");
    const inputDisplayForm = document.getElementById("cbd-form");
    inputSizeForm === null || inputSizeForm === void 0 ? void 0 : inputSizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let form = event.target;
        let height = form[0].value;
        let width = form[1].value;
        if (this.chocolateBarHeight != height && this.chocolateBarWidth != width) {
            this.setChocolateBarSize(height, width);
            this.deployChocolateBar();
            this.resetMinCostTextValue();
        }
        else {
            window.alert("Size hasn't been changed, please select a new size");
        }
    });
    inputDisplayForm === null || inputDisplayForm === void 0 ? void 0 : inputDisplayForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputRows = document.querySelectorAll("#row");
        const inputCols = document.querySelectorAll("#col");
        const weightRowEdges = [];
        const weightColEdges = [];
        inputRows.forEach((input) => weightRowEdges.push(parseInt(input.value)));
        inputCols.forEach((input) => weightColEdges.push(parseInt(input.value)));
        this.calculateMinimumCost(weightRowEdges, weightColEdges);
        this.setMinCostText();
    });
};
function setChocolateBarSize(height, width) {
    this.chocolateBarHeight = height;
    this.chocolateBarWidth = width;
}
function deployChocolateBar() {
    this.showChocolateBar();
    this.setWeightInputs();
    this.unhideCalculateButton();
}
function showChocolateBar() {
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
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
function setWeightInputs() {
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
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
    if (rowInputsDiv) {
        rowInputsDiv.innerHTML = "";
        for (let i = 0; i < numRowInputs; i++) {
            rowInputsDiv.innerHTML +=
                "<input type='number' id='row' min='0' max='9999' required>";
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
function unhideCalculateButton() {
    const divBottom = document.getElementById("cbc-div");
    if (divBottom && divBottom.hidden) {
        divBottom.hidden = false;
    }
    else if (!divBottom) {
        window.alert("Up! somenthing when wrong");
    }
}
function calculateMinimumCost(weightRowEdges, weightColEdges) {
    const chocolateBar = new ChocolateBar(weightRowEdges, weightColEdges);
    this.minimumCost = chocolateBar.calculateMinimumCost();
}
function setMinCostText() {
    const minCostSpan = document.getElementById("min-cost-span");
    if (minCostSpan) {
        minCostSpan.innerText = this.minimumCost;
    }
}
function resetMinCostTextValue() {
    const minCostSpan = document.getElementById("min-cost-span");
    if (minCostSpan) {
        minCostSpan.innerText = "";
    }
}
class ChocolateBar {
    constructor(weightRowEdges, weightColEdges) {
        this.weightRowEdges = weightRowEdges.map((rowEdge) => {
            return [rowEdge, "row"];
        });
        this.weightColEdges = weightColEdges.map((colEdge) => {
            return [colEdge, "col"];
        });
    }
    get allWeightsSorted() {
        const allWeights = [...this.weightRowEdges, ...this.weightColEdges];
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
