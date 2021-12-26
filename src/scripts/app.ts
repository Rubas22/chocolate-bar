var chocolateBarHeight: number = 0;
var chocolateBarWidth: number = 0;

window.onload = () => {
  const inputForm = document.getElementById("set-size-bar");
  inputForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    let form: any = event.target;
    let height: number = form[0].value;
    let width: number = form[1].value;
    this.setChocolateBarSize(height, width);
  });
};

function setChocolateBarSize(height: number, width: number): void {
  this.chocolateBarHeight = height;
  this.chocolateBarWidth = width;
}
