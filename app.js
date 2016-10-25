var app = require('express')();
var randomstring = require("randomstring");
var weather = require('openweather-apis');

var appidkey = '08418fc2f148059776aed472e2e417b2';

app.set('port', (process.env.PORT || 8080));

weather.setAPPID(appidkey);
weather.setLang('en');
weather.setCity('Sigtuna');

app.get('/api/:nodekey', function(req, res) {
  var nodekey = req.params.nodekey;

  weather.setCity(nodekey);

  /*
  weather.getDescription(function(err, desc){
    console.log(desc);
    res.send(desc);
  });
  */
  weather.getAllWeather(function(err, JSONObj){
    console.log(JSONObj);
    res.send(JSONObj);
  });

  //res.send({ "value": nodekey, "source": JSONObj });

});


app.get('/', function(req, res) {
  weather.getDescription(function(err, desc){
    console.log(desc);
    res.send(desc);
  });
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
