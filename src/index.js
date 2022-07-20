import './style.css';
let region = document.querySelector('.region');
let weather_main = document.querySelector('.weather_main');
let weather_description = document.querySelector('.weather_description');
let weather_img = document.querySelector('img');
let weather_temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let outputsArray = [];
outputsArray = Array.from(document.querySelectorAll('section > *'));
function getWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=90278183edd7ba0f9dcb74d03383c750&units=metric`)
    .then(response => response.json())
    .then(data =>{
        if(data){
            displayToDom(data);
        }
    }).catch(err =>{
        handleError();
    })
}
let userForm = document.querySelector('form');
userForm.addEventListener('submit',()=>{
   let userCity = document.querySelector('input').value;
   getWeather(userCity);
})
function handleError(){
    alert('Please enter a valid City name');
    outputsArray.forEach((output)=>{
        output.innerText = "";
        output.src = "";
    })
}
function displayToDom(data){
    region.innerText = `Weather in ${data.name}`;
    weather_main.innerText = data.weather[0].main;
    weather_description.innerText = data.weather[0].description;
    weather_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weather_temp.innerText = `${data.main.temp}°C`;
    wind.innerText = `Wind: ${data.wind.speed}`;
    humidity.innerText = `Humidity: ${data.main.humidity}`;
}
window.onload = ()=>{
    let userCity = document.querySelector('input');
    userCity.value = "";
    outputsArray.forEach((output)=>{
        output.innerText = "";
        output.src = "";
    })
}