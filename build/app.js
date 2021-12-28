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
    let rows = "";
    for (let i = 0; i < this.chocolateBarHeight; i++) {
        rows += "<div class='row'></div>";
    }
    if (chocBarDiv !== null) {
        for (let i = 0; i < this.chocolateBarWidth; i++) {
            chocBarDiv.innerHTML += "<div class='col'>" + rows + "</div>";
        }
    }
}
