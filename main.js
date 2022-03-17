const form = document.querySelector("#weather-look-up")
const input = document.querySelector('#location')
const weatherTemp = document.querySelector('#temp')
const weatherOutlook = document.querySelector('#outlook')
const weatherPic = document.querySelector('.weatherpic')
function setGeoDataByCityName( cityName ) {
    var key = '23140de0e11e66b4e3331b76ba89a7ef';
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + key)  
    .then(function(resp) { return resp.json() })
    .then(function(data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      setWeatherFromLatLon(lat, lon);
    })
    .catch(function() {
      console.log('error');
    });
  }

  function setWeatherFromLatLon( lat, lon ) {
    var key = '23140de0e11e66b4e3331b76ba89a7ef';
    console.log(lat);
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&appid=' + key)
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      let outlook = data.weather[0].description
      weatherTemp.innerHTML = "Outlook: " + outlook;

      displayWeatherPicture(data.weather[0].icon);
      weatherOutlook.innerHTML = "Feels like: " + (Math.round(data.main.feels_like - 273.15)) + "°C" ;
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }

function displayWeatherPicture(icon) {
  //const path = "img/" + String(num) + ".png";
  const path = "http://openweathermap.org/img/wn/" + icon + ".png";
  console.log(path)
  weatherPic.innerHTML = '<img src="' + path + '" height="100px" width="100px">';
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const inputVal = input.value;
  setGeoDataByCityName(inputVal)
})
