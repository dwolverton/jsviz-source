var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json({extended: true}));
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var data = {
    randomOrder: true,
    problemSets: {
        "default" : [
            {
                start: { x: "Hello There!" },
                goal: {}
            }
        ]
    }
}

app.get('/problems.json', function(req, res) {
    res.json(data)
});

app.put('/default-problem.json', function(req, res) {
    var problem = {
        start: req.body.start || {},
        goal: req.body.goal || {}
    };
    data.problemSets = { "default": [ problem ] }
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
})
