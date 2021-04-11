currentData = {}; //empty opject fie
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear(); // getting today date
var temp = 0;
const apiKey = '9ad883bdccd12827fc9c35fd6402a466'; //api key
const btn = document.querySelector('#generate');
btn.addEventListener('click', getDate); //function that trigs user click
async function getDate() { //async function
  try {
    const Zipcode = document.querySelector('#zip').value; //getting zip code value using DOM
    var fullUrll = `http://api.openweathermap.org/data/2.5/weather?zip=${Zipcode}&appid=${apiKey}&units=metric`;
    if (!Zipcode) { //if user had chosen to get Temp by City Not ZIP code
      var city = document.getElementById('citySel').value; //get city name from select
      var fullUrll = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    }
    const response = await fetch(fullUrll) //getting data from api
      .then(response => response.json()) //turning data to json
      .then(data => {
        temp = data.main.temp; //getting current temp value from api response
      }).then(postData) //post data function
  } catch (err) {
    console.log(err);
  }
}

const postData = async (url = '/add', data = { //post data to that route
  date: newDate,
  temp: temp,
  feelings: document.getElementById('feelings').value
}) => {
  const response = await fetch('/add', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then(async () => {
    fetch('/all', { //getting the last data depending on  user input from server side
        method: 'GET',
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(data => {
        currentData = data[data.length - 1]; //last elemnt in data array from server side
        console.log(currentData);
      }).then(updateUI) //update UI function
  })
  // try {
  //   // const newData = await response.json();
  //   // return newData
  //   // console.log(newData);
  // } catch (error) {
  //   console.log("error", error);
  // }
}
const updateUI = async function() { //updating Divs content using the current data
  document.getElementById('date').innerHTML = `Date is ${currentData.date}`;
  document.getElementById('temp').innerHTML = `Current Temprature is ${currentData.temp} ℃`;
  document.getElementById('content').innerHTML = `Feelings: ${currentData.feelings}`;
}