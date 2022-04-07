var express = require('express');

var app = express();

var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/file.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req,res){
  res.send({
    unix : (new Date()).getTime(),
    utc : (new Date()).toUTCString()
  })
})

app.get("/api/:value", function( req,res) {
  
  const valueAsString = req.params.value;

  if( (new Date(parseInt(valueAsString))).toString() === "Invalid Date") {
    res.send({ error : "Invalid Date" });
    return;
  }
  
  const date = new Date(valueAsString);
  const unix = Math.floor(date.getTime());
  const utc = date.toUTCString();
  
  if( valueAsString.indexOf('-') === -1){
    //unix format
    const unix = valueAsString;
    const utc = (new Date(parseInt(unix))).toUTCString();
    res.send({ unix : parseInt(unix) , utc : utc });
    
  } else{
    //date format
    res.send({ unix : parseInt(unix), utc : utc})
    
  }
})


// listen for requests :)
app.listen(3000,() => {
    console.log(`Server running on PORT ${3000}`);
})

