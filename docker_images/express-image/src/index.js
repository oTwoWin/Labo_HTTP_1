var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/test', function(req, res) {
   res.send(generateAnimals());
});

app.get('/', function(req, res) {
   res.send("Hello RES");
});


app.listen(3000, function(){
   console.log('Accepting HTTP requests on port 3000.');
});


function generateAnimals() {
  var numberOfAnimals = chance.integer({
    min: 0,
    max: 10
  });
  console.log(numberOfAnimals);
  var animals = [];
  for(var i = 0; i < numberOfAnimals; ++i){
    var animalType = chance.animal();
    var gender = chance.gender();
    var name = chance.name({
      gender: gender
    });
    var hashtag = chance.hashtag();
    animals.push({
      type: animalType,
      name: name,
      gender: gender,
      hashtag: hashtag
    });
  }
  console.log(animals);
  return animals;
}
