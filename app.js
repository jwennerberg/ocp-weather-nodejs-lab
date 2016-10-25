var app = require('express')();
var randomstring = require("randomstring");
var weather = require('openweather-apis');
var urllib = require('urllib');
const exec = require('child_process').exec;

var appidkey = '08418fc2f148059776aed472e2e417b2';

app.set('port', (process.env.PORT || 8080));

var defaultCity = 'Sigtuna';

weather.setAPPID(appidkey);
weather.setLang('en');
weather.setCity(defaultCity);

app.get('/api/:nodekey', function(req, res) {
  var nodekey = req.params.nodekey;

  var jsonblob = '{"kind":"Scale","apiVersion":"extensions/v1beta1","metadata":{"name":"frontend","namespace":"test-tore","selfLink":"/oapi/v1/namespaces/test-tore/deploymentconfigs/frontend/scale","uid":"65fcf782-9a8d-11e6-87f8-02af4b58a009","resourceVersion":"106298","creationTimestamp":"2016-10-25T08:31:17Z"},"spec":{ "replicas": 2 } }'

  var fs = require('fs');
  fs.writeFile("/tmp/json", jsonblob);

  weather.setCity(nodekey);

  weather.getDescription(function(err, desc){
    console.log(desc);
    //res.send(desc);
    var matches = desc.match(/rain/);
    console.log(matches);
    res.send(matches);
    if (matches !== null) {
      exec('curl -k -X PUT -H "Authorization: Bearer OrrVzIQ1uusnH8E2TKCp2peeJB7RiZPHVYCjtxqKcIg" -H "Content-Type: application/json" -d @/tmp/json https://openshift-master.ocp.rocks:443/oapi/v1/namespaces/test-tore/deploymentconfigs/frontend/scale', (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
      urllib.request('http://frontend-test-tore.apps.ocp.rocks/change.php?weather=w', function (err, data, res) {
        console.log(data.toString());
      });
    } else {
      urllib.request('http://frontend-test-tore.apps.ocp.rocks/change.php?weather=s', function (err, data, res) {
        console.log(data.toString());
      });
    }
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
  });
});

app.listen(app.get('port'), function(){
  console.log('Server listening on port: ', app.get('port'));
});
