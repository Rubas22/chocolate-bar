"use strict";
let chocolateBarHeight = 0;
let chocolateBarWidth = 0;
let minimumCost;
window.onload = () => {
    const inputSizeForm = document.getElementById("set-size-bar");
    let inputDisplayForm = document.getElementById("cbd-form");
    inputSizeForm === null || inputSizeForm === void 0 ? void 0 : inputSizeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let form = event.target;
        let height = form[0].value;
        let width = form[1].value;
        this.setChocolateBarSize(height, width);
        this.deployChocolateBar();
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
class ChocolateBar {
    constructor(weightRowEdges, weightColEdges) {
        this.weightRowEdges = weightRowEdges;
        this.weightColEdges = weightColEdges;
    }
    get numHorizontalEdges() {
        return this.weightRowEdges.length;
    }
    get numVerticalEdges() {
        return this.weightColEdges.length;
    }
    calculateMinimumCost() {
        let minimumCost = 0;
        let rowEdges = this.weightRowEdges;
        let colEdges = this.weightColEdges;
        let maxRowValue = Math.max(...rowEdges);
        let maxColValue = Math.max(...colEdges);
        let numHorizontalCuts = 0;
        let numVerticalCuts = 0;
        let previousNumHorizontalEdges = this.numHorizontalEdges;
        let previousNumVerticalEdges = this.numVerticalEdges;
        let numOfMaxRows;
        let numOfMaxCols;
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
            }
            else {
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
