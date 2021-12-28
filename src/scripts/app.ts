let chocolateBarHeight: number = 0;
let chocolateBarWidth: number = 0;

window.onload = () => {
  const inputForm = document.getElementById("set-size-bar");
  inputForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    let form: any = event.target;
    let height: number = form[0].value;
    let width: number = form[1].value;
    this.setChocolateBarSize(height, width);
    this.deployChocolateBar();
  });
};

function setChocolateBarSize(height: number, width: number): void {
  this.chocolateBarHeight = height;
  this.chocolateBarWidth = width;
}

function deployChocolateBar(): void {
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
