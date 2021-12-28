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
    let chocBarDiv = document.getElementById("cbd");
    let row = "";
    for (let i = 0; i < this.chocolateBarWidth; i++) {
        row += "<div class='piece'></div>";
    }
    if (chocBarDiv !== null) {
        chocBarDiv.innerHTML = "";
        for (let i = 0; i < this.chocolateBarHeight; i++) {
            chocBarDiv.innerHTML += "<div class='row'>" + row + "</div>";
        }
    }
    else {
        window.alert("Up! somenthing when wrong");
    }
}
