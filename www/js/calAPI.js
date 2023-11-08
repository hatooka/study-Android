
var apiKey = "0464c0571bfec1d30557c0667fe7657b";

function clickButton(){
  let cityName = document.getElementById('cityName').value;

  // 地名から緯度経度を取得
  callGeoCodeApi(cityName).then(obj => {
    // 緯度経度をもとに天気情報を取得
    callWeatherApi(obj.lat,obj.lon).then(data =>{

    // 画面に反映
      let cityLabel = document.getElementById('city');
      let maxTempLabel = document.getElementById('maxTemp');
      let minTempLabel = document.getElementById('minTemp');
      let weatherLabel = document.getElementById('weather');
      cityLabel.innerHTML=cityName;
      console.log(data.main);
      maxTempLabel.innerHTML=data.main.temp_max;
      minTempLabel.innerHTML=data.main.temp_min;
      weatherLabel.innerHTML = data.weather[0].main
    }).catch(error =>{
      console.error(error);
    });

  }).catch(error => {
    console.error(error);
  });
};

function callWeatherApi(lat,lon){
  
  return new Promise((resolve, reject) =>{
    const request = new XMLHttpRequest();
    let path = "https://api.openweathermap.org/data/2.5/weather?units=metric&lat="+ lat +"&lon="+ lon + "&appid=" + apiKey;
    request.open("GET", path);
    request.send();
    request.addEventListener("load", function () {
      const data = JSON.parse(this.responseText);
      resolve(data)
    });
    request.addEventListener("error", function(e){
      reject(e)
      console.error(e)
    })
  });
}
function callGeoCodeApi(cityName){
  return new Promise((resolve, reject) =>{
    const request = new XMLHttpRequest();
    let path = 'https://api.openweathermap.org/geo/1.0/direct?q='+ cityName + '&limit=5&appid=' + apiKey;
    request.open("GET", path);
    request.send();
    request.addEventListener("load", function () {
        const data = JSON.parse(this.responseText);
        if (data.length > 0){
            resolve({lat:data[0].lat,lon:data[0].lon});
        } else {
          reject("No data found")
        }
    });
  });
};



