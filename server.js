// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const jsonResponse = date => ({ unix: date.getTime(), utc: date.toUTCString() });

app.get("/api/:date", (req, res) => {
  let date = new Date(req.params.date);
  if (/^\d*$/.test(req.params.date)) date.setTime(req.params.date);
  if (date.getTime()) {
    res.json(jsonResponse(date)); 
  }
  else {
    res.json({ error: "Invalid Date" });
  }

  // let date = new Date(req.params.date);
  // if (isNaN(date.getTime())) {
  //   date = new Date(Number(req.params.date));
  //   if (isNaN(date.getTime())) {
  //     res.json({ error: "Invalid Date" });
  //     return;
  //   } 
  // }
  // res.json(jsonResponse(date));
});


app.get("/api", (req, res) => {
  let currentDate = new Date();
  res.json(jsonResponse(currentDate));
 });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
