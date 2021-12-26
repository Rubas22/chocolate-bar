"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chocolateBar_1 = require("./modules/chocolateBar");
var chocolateBar = new chocolateBar_1.ChocolateBar([], []);
var chocolateBarSize = [0, 0];
window.onload = () => {
    const inputForm = document.getElementById("set-size-bar");
    inputForm === null || inputForm === void 0 ? void 0 : inputForm.addEventListener("submit", (event) => {
        console.log(event);
        event.preventDefault();
    });
};
function setChocolateBarSize() {
    this.chocolateBarSize[0] = 2;
    this.chocolateBarSize[1] = 4;
    console.log("we did it");
}
