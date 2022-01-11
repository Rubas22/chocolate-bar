"use strict";
let chocolateBarHeight = 0;
let chocolateBarWidth = 0;
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
        console.log("COOOL");
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
                "<input type='number' min='0' max='9999' required>";
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
    if (rowInputsDiv) {
        rowInputsDiv.innerHTML = "";
        for (let i = 0; i < numRowInputs; i++) {
            rowInputsDiv.innerHTML +=
                "<input type='number' min='0' max='9999' required>";
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
