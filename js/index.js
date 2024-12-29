// const item =document.querySelectorAll('.my-nav .linkes .item')
// const link =document.querySelectorAll('.my-nav .linkes .item a')

//====================today==========================

const today = document.getElementById("today");
const city = document.getElementById("city");
const todayDgree = document.getElementById("todayDgree");
const todayDes = document.getElementById("todayDes");
const todaySpeed = document.getElementById("todaySpeed");
const todayDirec = document.getElementById("todayDirec");
const todayImg = document.getElementById("todayImg");
const todayHuminty = document.getElementById("todayHuminty");

//====================tom==========================

const tom = document.getElementById("tom");
const tomDgreeBig = document.getElementById("tomDgreeBig");
const tomDgreeSma = document.getElementById("tomDgreeSma");
const tomDes = document.getElementById("tomDes");
const tomImg = document.getElementById("tomImg");

//====================next==========================

const nextDay = document.getElementById("nextDay");
const nextDgreeBig = document.getElementById("nextDgreeBig");
const nextDgreeSma = document.getElementById("nextDgreeSma");
const nextDes = document.getElementById("nextDes");
const nextImg = document.getElementById("nextImg");

const searchCity = document.getElementById("searchCity");
const btnfind = document.getElementById("find");

navigator.geolocation.getCurrentPosition((position) => {
  console.log(position.coords);
  let altitude = position.coords.altitude;
  let longitude = position.coords.longitude;
  getWatherData(`${altitude},${longitude}`);
});

// searchCity.addEventListener('input',(e)=>{
//     let currentValue = e.target.value
//     getWatherData(currentValue)
// })
btnfind.addEventListener("click", () => {
  getWatherData(searchCity.value);
});

async function getWatherData(quary) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=592c6c3c49504f0ba24120716242912&q=${quary}&days=3&aqi=no&alerts=no`
  );
  let myData = await res.json();
  console.log(myData);
  displayToDay(myData);
  displayTom(myData);
  displayNext(myData);
}

function displayToDay(myData) {
  let mydate = myData.current.last_updated;
  console.log(mydate);
  let dateDay = new Date(mydate);
  let dayName = dateDay.toLocaleString("en-us", { weekday: "long" });
  today.innerHTML = dayName;

  city.innerHTML = myData.location.country;
  todayDgree.innerHTML += myData.current.temp_c;
  let apisrc = myData.current.condition.icon;
  let mySrc = `https:${apisrc}`;
  todayImg.setAttribute("src", mySrc);
  todayDes.innerHTML = myData.current.condition.text;
  todayHuminty.innerHTML = myData.current.humidity;
  todaySpeed.innerHTML = myData.current.wind_kph;
  todayDirec.innerHTML = myData.current.wind_dir;
}

function displayTom(myData) {
  let myTomm = myData.forecast.forecastday[1];
  let tomDate1 = new Date(myTomm.date);
  let tomDate2 = tomDate1.toLocaleString("en-us", { weekday: "long" });
  tom.innerHTML = tomDate2;

  let apiSrc = myTomm.day.condition.icon;
  let mySrc = `https:${apiSrc}`;
  tomImg.setAttribute("src", mySrc);

  tomDes.innerHTML = myTomm.day.condition.text;
  tomDgreeBig.innerHTML = myTomm.day.maxtemp_c;
  tomDgreeSma.innerHTML = myTomm.day.mintemp_c;
}
function displayNext(myData) {
  let myNext = myData.forecast.forecastday[2];
  let nextDate1 = new Date(myNext.date);
  let nextDate2 = nextDate1.toLocaleString("en-us", { weekday: "long" });
  nextDay.innerHTML = nextDate2;

  let apiSrc = myNext.day.condition.icon;
  let mySrc = `https:${apiSrc}`;
  nextImg.setAttribute("src", mySrc);

  nextDes.innerHTML = myNext.day.condition.text;
  nextDgreeBig.innerHTML = myNext.day.maxtemp_c;
  nextDgreeSma.innerHTML = myNext.day.mintemp_c;
}

// for(let i=0;i<item.length;i++){
//         item[i].addEventListener('click',function(e){
//             e.target.style.cssText=`
//             color: #009AD8;
//             `
//             item[i].style.cssText=`
//                 border: #009AD8 solid 3px;
//                 border-radius: 20px;

//             `

//         })
// }
