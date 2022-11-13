const weatherState = {
  '01d': 'CLEAR_DAY',
  '01n': 'CLEAR_NIGHT',
  '02d': 'PARTLY_CLOUDY_DAY',
  '02n': 'PARTLY_CLOUDY_NIGHT',
  '03d': 'CLOUDY',
  '03n': 'CLOUDY',
  '04d': 'CLOUDY',
  '04n': 'CLOUDY',
  '09d': 'SLEET',
  '09n': 'SLEET',
  '10d': 'RAIN',
  '10n': 'RAIN',
  '11d': 'RAIN',
  '11n': 'RAIN',
  '13d': 'SNOW',
  '13n': 'SNOW',
  '50d': 'FOG',
  '50n': 'FOG',
}

const btn = document.querySelector('.search__icon');
const searchCity = document.querySelector('.input');
let long, lat;

const location__city = document.querySelector('.location__city h1');
const location__icon = document.querySelector('#icon1');
const weather__degree = document.querySelector('.info__degree');
const weather__humidity = document.querySelector('.info__humidity');
const weather__wind = document.querySelector('.info__wind');

window.addEventListener('load', () => {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      long = pos.coords.longitude;
      lat = pos.coords.latitude;

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3019e49bf15d615d256ec58f65e51b10`)
        .then(response => response.json())
        .then(data => setWeather(data.name))
    })
  }
})
function setWeather(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=3019e49bf15d615d256ec58f65e51b10`;
  fetch(api)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const { temp, humidity } = data.main;
      const { icon } = data.weather[0];
      const { name } = data
      const { speed } = data.wind
      location__city.textContent = name;
      weather__degree.textContent = parseInt(temp) + " °C";
      weather__wind.textContent = speed + ' m/s'
      weather__humidity.textContent = humidity + "%"
      setIcon(icon, location__icon)
    })
}
function setIcon(icon, iconID) {
  const skycons = new Skycons({ color: "#f099ca" })
  let currentIcon;
  for (let i in weatherState) {
    if (weatherState.hasOwnProperty(i)) {
      icon === i ? currentIcon = weatherState[i] : void 0
    }
  }
  skycons.play()
  return skycons.set(iconID, Skycons[currentIcon])
}
btn.onclick = () => changeCity()
function changeCity() {
  setWeather((searchCity.value))
  searchCity.value = ''
}
document.addEventListener('keyup', e => (e.key === 'Enter') ? changeCity() : void 0)
