let divForThePictures = document.getElementById("divForThePictures");
let animeParagraph = document.getElementById("animeParagraph");
let button = document.getElementById("button");

button.addEventListener("click", (e) => {
  clearTheDivForPictures();
  e.preventDefault();
  renderFlickrPic();
  anime();
});

function renderFlickrPic() {
  let inputText = document.getElementById("inputText").value;
  let inputNumber = document.getElementById("inputNumber").value;
  let inputSorting = document.getElementById("inputSorting").value;
  let inputSortingValue = "";

  let checkboxSmall = document.getElementById("checkboxSmall");
  let checkboxMedium = document.getElementById("checkboxMedium");
  let checkboxLarge = document.getElementById("checkboxLarge");
  let checkboxValue = "";

  if (checkboxSmall.checked) {
    checkboxValue = "m";
  } else if (checkboxMedium.checked) {
    checkboxValue = "z";
  } else if (checkboxLarge.checked) {
    checkboxValue = "b";
  } else {
    let checkboxError = document.createElement("h1");
    checkboxError.innerHTML = `<li>Please choose a img size!</li>`;
    document.body.appendChild(checkboxError);
  }

  if (inputSorting === "Date posted") {
    inputSortingValue = "date-posted-asc";
    console.log(inputSortingValue);
  } else if (inputSorting === "Interestingness") {
    inputSortingValue = "interestingness-asc";
    console.log(inputSortingValue);
  } else if (inputSorting === "Relevance") {
    inputSortingValue = "relevance";
    console.log(inputSortingValue);
  }

  const animation = anime({
    targets: "p",
    color: "white",
    translateX: 5,
    translateY: 5,
    backgroundColor: "hsl(330, 100%, 71%)",
    border: "dotted 10px orange",
    duration: 400,
    easing: "linear",
    direction: "alternate",
  });

  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=53e8d7af0f521f892d0883605d2e7213&text=${inputText}&per_page=${inputNumber}&sort=${inputSortingValue}&format=json&nojsoncallback=1 `;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.photos.photo.forEach((obj) => {
        divForThePictures.innerHTML += `<img src="https://live.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_${checkboxValue}.jpg"/>`;
      });
    })
    .catch((error) => {
      let createErrorMessage = document.createElement("h1");
      createErrorMessage.innerHTML = `<li>Please fill in the "Search..." input!</li>`;
      document.body.appendChild(createErrorMessage);
      console.log(error);
    });
}

function clearTheDivForPictures() {
  divForThePictures.innerHTML = "";
}
