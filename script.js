let button = document.getElementById("button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  renderFlickrPic();
});

function renderFlickrPic() {
  let inputText = document.getElementById("inputText").value;
  let inputNumber = document.getElementById("inputNumber").value;
  let inputDateMin = document.getElementById("inputDateMin").value;
  let inputDateMax = document.getElementById("inputDateMax").value;
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=53e8d7af0f521f892d0883605d2e7213&text=${inputText}&per_page=${inputNumber}&min_upload_date=${inputDateMin}&max_upload_date=${inputDateMax}&format=json&nojsoncallback=1 `;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
  console.log(inputText);
  console.log(inputNumber);
  console.log(inputDateMin);
  console.log(inputDateMax);
}
