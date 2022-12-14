let button = document.getElementById("button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  renderFlickrPic();
  console.log("Knappen klickad");
});

function renderFlickrPic() {
  let input = document.getElementById("input").value;
  let inputNumber = document.getElementById("inputNumber").value;
  console.log("Funktionen körs");
  console.log(input);
}
