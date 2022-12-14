let divForThePictures = document.getElementById("divForThePictures");
let button = document.getElementById("button");

button.addEventListener("click", (e) => {
  clearTheDivForPictures();
  e.preventDefault();
  renderFlickrPic();
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
  }

  if (inputSorting === "Date posted") {
    inputSortingValue = "date-posted-asc";
  } else if (inputSorting === "Interestingness") {
    inputSortingValue = "interestingness-asc";
  } else if (inputSorting === "Relevance") {
    inputSortingValue = "relevance";
  }

  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=53e8d7af0f521f892d0883605d2e7213&text=${inputText}&per_page=${inputNumber}&sort=${inputSorting}&format=json&nojsoncallback=1 `;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.photos.photo.forEach((obj) => {
        divForThePictures.innerHTML += `<img src="https://live.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_${checkboxValue}.jpg"/>`;
      });
      console.log(data.photos.photo);
    });
}

function clearTheDivForPictures() {
  divForThePictures.innerHTML = "";
}
