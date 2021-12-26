import { ChocolateBar } from "./modules/chocolateBar";

var chocolateBar: ChocolateBar = new ChocolateBar([], []);
var chocolateBarSize = [0, 0];

window.onload = () => {
  const inputForm = document.getElementById("set-size-bar");
  // inputForm.onsubmit= () => {
  //     this.setChocolateBarSize();
  // }
  inputForm?.addEventListener("submit", (event) => {
    console.log(event);
    event.preventDefault();
  });
};

function setChocolateBarSize() {
  this.chocolateBarSize[0] = 2;
  this.chocolateBarSize[1] = 4;
  console.log("we did it");
}
