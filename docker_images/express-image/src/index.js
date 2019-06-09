var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();
var ip = require('ip');

app.get('/', function(req, res) {
   var animals = generateAnimals();
   var payload = { "Animals" : animals, "Ip address" : ip.address()};
   res.send(payload);
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
