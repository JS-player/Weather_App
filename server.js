projectData = []; //empty array to push data into

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cors = require('cors');
const app = express();
//setting server and requireing functions
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

app.get('/', function(req, res) { //setting the main GET route
  res.sendFile(__dirname + 'website/index.html'); //send The main html file as response
});
app.listen(process.env.PORT || 3000, function() { //listen on port 3000 or onother port if code in fly ot locally
  console.log('App is running on port 3000');
});


app.post('/add', function(req, res) {
  let newEntrey = req.body; //getting posted data
  console.log('Post Done');
  projectData.push(newEntrey); //push data to the main data array
  res.send();
});

app.get('/all', function(req, res) { //setting get data route
  res.send(projectData); //send all data
});