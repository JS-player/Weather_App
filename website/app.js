currentData = {};
let d = new Date();
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
var temp = 0;
const apiKey = '9ad883bdccd12827fc9c35fd6402a466';
const btn = document.querySelector('#generate');
btn.addEventListener('click', getDate);
async function getDate() {
  try {
    const Zipcode = document.querySelector('#zip').value;
    var fullUrll = `http://api.openweathermap.org/data/2.5/weather?zip=${Zipcode}&appid=${apiKey}&units=metric`;
    if (!Zipcode) {
      var city = document.getElementById('citySel').value;
      var fullUrll = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    }
    const response = await fetch(fullUrll)
      .then(response => response.json())
      .then(data => {
        temp = data.main.temp;
      }).then(postData)
  } catch (err) {
    console.log(err);
  }
  console.log('Working 2');
}

const postData = async (url = '/add', data = {
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
    fetch('/all', {
        method: 'GET',
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(data => {
        currentData = data[data.length - 1];
        console.log(currentData);
      }).then(updateUI)
  })
  // try {
  //   // const newData = await response.json();
  //   // return newData
  //   // console.log(newData);
  // } catch (error) {
  //   console.log("error", error);
  // }
}
const updateUI = async function() {
  document.getElementById('date').innerHTML = `Date is ${currentData.date}`;
  document.getElementById('temp').innerHTML = `Current Temprature is ${currentData.temp} ℃`;
  document.getElementById('content').innerHTML = `Feelings: ${currentData.feelings}`;
}