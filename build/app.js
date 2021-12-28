"use strict";
let chocolateBarHeight = 0;
let chocolateBarWidth = 0;
window.onload = () => {
    const inputForm = document.getElementById("set-size-bar");
    inputForm === null || inputForm === void 0 ? void 0 : inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let form = event.target;
        let height = form[0].value;
        let width = form[1].value;
        this.setChocolateBarSize(height, width);
        this.deployChocolateBar();
    });
};
function setChocolateBarSize(height, width) {
    this.chocolateBarHeight = height;
    this.chocolateBarWidth = width;
}
function deployChocolateBar() {
    this.showChocolateBar();
    this.setWeightInputs();
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
        for (let i = 0; i < numColInputs; i++) {
            colInputsDiv.innerHTML += "<input type='number' required>";
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
    if (rowInputsDiv) {
        for (let i = 0; i < numRowInputs; i++) {
            rowInputsDiv.innerHTML += "<input type='number' required>";
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
