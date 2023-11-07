
function apiRequest(){
      const request = new XMLHttpRequest();
      request.open("GET", "https://official-joke-api.appspot.com/jokes/random");
      request.send();

      request.addEventListener("load", function () {
         console.log(this.responseText);
         const data = JSON.parse(this.responseText);
         let label = document.getElementById('ResponseText');
         label.innerHTML="問:"+ data.setup + "<br>"+"回答:"+data.punchline;
      });
  };

  function callWeatherApi(){
      const request = new XMLHttpRequest();
      let cityName = document.getElementById('cityName').value;
      console.log(cityName);
      var apiKey = "0464c0571bfec1d30557c0667fe7657b";
      let path = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey;
      request.open("GET", path);
      request.send();

      request.addEventListener("load", function () {
      const weatherReq = new XMLHttpRequest();
        let label = document.getElementById('ResponseText');
         console.log(this.responseText);
         const data = JSON.parse(this.responseText);
         if (data.length > 0){
         let city = data[0].name;
         let lat = data[0].lat;
         let lon = data[0].lon;
         let weatherPath = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ lat +"&lon="+ lon + "&appid=" + apiKey;
         weatherReq.open("GET", weatherPath);
         weatherReq.send();

         weatherReq.addEventListener("load", function (){
         console.log(this.responseText);
         const wData = JSON.parse(this.responseText);
         let cityLabel = document.getElementById('city');
         let maxTempLabel = document.getElementById('maxTemp');
         let minTempLabel = document.getElementById('minTemp');
         let weatherLabel = document.getElementById('weather');
         cityLabel.innerHTML=cityName;
         console.log(wData.main);
         maxTempLabel.innerHTML=wData.main.temp_max;
         minTempLabel.innerHTML=wData.main.temp_min;
         weatherLabel.innerHTML = wData.weather[0].main
         });
         };
      });
  };

function callWeatherApi2(){
      const request = new XMLHttpRequest();
      var apiKey = "0464c0571bfec1d30557c0667fe7657b";
      var cityName = "東京";
      var obj = loadGeocode();
      console.log(loadGeocode);
      console.log(obj);
     let weatherPath = "http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ obj.lat +"&lon="+ obj.lon + "&appid=" + apiKey;
     weatherReq.open("GET", weatherPath);
     weatherReq.send();

     weatherReq.addEventListener("load", function (){
        console.log(this.responseText);
     });

  };
  function loadGeocode(){
    const request = new XMLHttpRequest();
    var apiKey = "0464c0571bfec1d30557c0667fe7657b";
    let path = 'http://api.openweathermap.org/geo/1.0/direct?q='+ "東京" + '&limit=5&appid=' + apiKey;
    request.open("GET", path);
    request.send();
    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);
        if (data.length > 0){
            return {lat:data[0].lat,lon:data[0].lon};
        }
        return {lat:"",lon:""};
    });
  };

let button =document.getElementById('button');
button.onClick = callWeatherApi;



