$(function(){
	console.log("Loading animals");
	
	function loadAnimals(){
		$.getJSON("/api/animals/", function( animals ){
		console.log(animals);
		var message = "No animals";
		if ( animals.Animals.length > 0 ){
			message = animals.Animals[0].name + " the " + animals.Animals[0].type;
		}
		$(".animals").text(message);
	});
	};
	loadAnimals();
	setInterval( loadAnimals, 2000);
});
