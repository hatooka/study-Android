
const request = new XMLHttpRequest();
request.open("GET", "https://official-joke-api.appspot.com/jokes/random");
request.send();

request.addEventListener("load", function () {
   console.log(this.responseText);
});

