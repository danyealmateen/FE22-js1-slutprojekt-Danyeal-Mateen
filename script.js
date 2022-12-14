//Här är alla globala divvar som behövs nås från flera platser.
let divForThePictures = document.getElementById("divForThePictures");
let animeParagraph = document.getElementById("animeParagraph");
let button = document.getElementById("button");

//Ett event som lyssnar på ett knapptryck där den först:
//1. Rensar divven som har img bilderna i sig,
//2. Hindrar formen från att refresha sidan,
//3. Skjuter iväg funktionen renderFlickrPic,
//4. Skjuter iväg funktionen för animeringen
button.addEventListener("click", (e) => {
  clearTheDivForPictures();
  e.preventDefault();
  renderFlickrPic();
  anime();
});

function renderFlickrPic() {
  //Samtliga inputfält
  let inputText = document.getElementById("inputText").value;
  let inputNumber = document.getElementById("inputNumber").value;
  let inputSorting = document.getElementById("inputSorting").value;
  let inputSortingValue = "";

  //Samtliga checkboxfält
  let checkboxSmall = document.getElementById("checkboxSmall");
  let checkboxMedium = document.getElementById("checkboxMedium");
  let checkboxLarge = document.getElementById("checkboxLarge");
  let checkboxValue = "";

  //If sats som kontrollerar om checkboxen är ibockade och skickar rätt värde (m,z,b) som motsvarar olika storleker på bilderna till den tomma variabeln checkboxValue som ersätter värdena i URL länken nedanför.
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

  //If sats som konceptmässigt gör samma sak som ovan fast med sorteringsfälten.
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

  //Animationen som kallas när man klickar på knappen.
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

  //Hämtar APIet från FLICKR med min egen personliga nyckel som jag skapat på hemsidan. Har ersatt attributen med värden från mina egna inputfält så att användaren själv kan välja vad som ska visas och hur.
  let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=53e8d7af0f521f892d0883605d2e7213&text=${inputText}&per_page=${inputNumber}&sort=${inputSortingValue}&format=json&nojsoncallback=1 `;

  //Hämtar URL:et
  fetch(url)
    //Konverterar det till json objekt.
    .then((response) => response.json())
    .then((data) => {
      //Loopar igenom arrayen så att jag kan hämta de olika objekten till mitt img element som jag skapar i min div (divForThePictures). Precis som ovan så ersätter jag attributen i URL fast denna gången med data från objektet som jag brytit ner för att kunna rendera bilderna jag hämtar in.
      data.photos.photo.forEach((obj) => {
        divForThePictures.innerHTML += `<img src="https://live.staticflickr.com/${obj.server}/${obj.id}_${obj.secret}_${checkboxValue}.jpg"/>`;
      });
    })
    //Fångar upp error meddelanden och loggar det i konsolen samt ett meddelande skrivs ut till DOM:en.
    .catch((error) => {
      let createErrorMessage = document.createElement("h1");
      createErrorMessage.innerHTML = `<li>Please fill in the "Search..." input!</li>`;
      document.body.appendChild(createErrorMessage);
      console.log(error);
    });
}

//Rensar innehållet av divven.
function clearTheDivForPictures() {
  divForThePictures.innerHTML = "";
}

//!!EXTRA funktionalitet!! Gjort en counter som räknar från 0 till 60.000.000 med en random fakta till användaren där den berättar hur många aktiva användare FLICKR har.
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  counter.innerText = "0";

  const updateCounter = () => {
    const target = +counter.getAttribute("data-target");
    const c = +counter.innerText;

    const increment = target / 200;

    if (c < target) {
      counter.innerText = `${Math.ceil(c + increment)}`;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCounter();
});
