"use strict";
var chocolateBarHeight = 0;
var chocolateBarWidth = 0;
window.onload = () => {
    const inputForm = document.getElementById("set-size-bar");
    inputForm === null || inputForm === void 0 ? void 0 : inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let form = event.target;
        let height = form[0].value;
        let width = form[1].value;
        this.setChocolateBarSize(height, width);
        console.log(this.chocolateBarWidth);
    });
};
function setChocolateBarSize(height, width) {
    this.chocolateBarHeight = height;
    this.chocolateBarWidth = width;
}
