var app = require('express')();
var randomstring = require("randomstring");
var weather = require('openweather-apis');

var appidkey = '08418fc2f148059776aed472e2e417b2';

app.set('port', (process.env.PORT || 8080));

var defaultCity = 'Sigtuna';

weather.setAPPID(appidkey);
weather.setLang('en');
weather.setCity(defaultCity);

app.get('/api/:nodekey', function(req, res) {
  var nodekey = req.params.nodekey;

  weather.setCity(nodekey);

  weather.getDescription(function(err, desc){
    console.log(desc);
    res.send(desc);
    var matches = str.match(/rain/);
    console.log(matches);
    res.send(matches);
  });
  /*
  weather.getAllWeather(function(err, JSONObj){
    console.log(JSONObj);
    res.send(JSONObj);
  });
  */

});


app.get('/', function(req, res) {
  weather.getDescription(function(err, desc){
    console.log(defaultCity);
    console.log(desc);
    res.send(desc);
    res.send(defaultCity);
  });
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
