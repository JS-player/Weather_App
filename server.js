projectData = [];

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + 'website/index.html');
});
app.listen(process.env.PORT || 3000, function() {
  console.log('App is running on port 3000');
});


app.post('/add', function(req, res) {
  let newEntrey = req.body;
  console.log('Post Done');
  projectData.push(newEntrey);
  res.send();
  // res.send(projectData[projectData.length - 1]);
});

app.get('/all', function(req, res) {
  res.send(projectData);
});