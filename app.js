angular.module('petSearchApp', [])
	.controller('petCtrl', petCtrl)
	.factory('petFactory', petFactory)

petCtrl.$inject = ['petFactory'];
petFactory.$inject = ['$http'];

function petCtrl(petFactory){
	var petCtrl = this;

	petCtrl.searchObject = {};
	petCtrl.searchObject.$t = '';
	petCtrl.sortKey = '$t';
	petCtrl.choose = true;
	petCtrl.bool = true;

	petCtrl.push = function () {
		petCtrl.choose = false;

		petCtrl.dog = function() {
			var userDogChoice = true;

			petCtrl.animals = 'Dog';
		 	petFactory.getDogList()

				.then( function(response){

					var data = response.data || {};
					console.log(data);

					var dogBreeds = data.petfinder.breeds.breed;
					petCtrl.breedList = [];
					for(var i = 0; i < dogBreeds.length; i++){
						petCtrl.breedList.push(dogBreeds[i].$t)
					}
					console.log('YOU CLICKED DOG!');
					console.log(petCtrl.breedList);

				}, function(error) {

					console.log('error no dogs here', error);

				})
		} 

		petCtrl.cat = function(){
			var userCatChoice = true;

			petCtrl.animals = 'Cat';
			petFactory.getCatList()

			.then( function(response){
				var data = response.data || {};

				var catBreeds = data.petfinder.breeds.breed;
				petCtrl.breedList = [];
				for(var i = 0; i < catBreeds.length; i++){
					petCtrl.breedList.push(catBreeds[i].$t)
				}
				console.log('YOU CLICKED CAT!');

			}, function(error) {

				console.log('error no cats here', error);

			})
		}

		petCtrl.bird = function(){
			petCtrl.animals = 'Bird';
			 	petFactory.getBirdList()

				.then( function(response){
					var data = response.data || {};

					var birdBreeds = data.petfinder.breeds.breed;
					petCtrl.breedList = [];
					for(var i = 0; i < birdBreeds.length; i++){
						petCtrl.breedList.push(birdBreeds[i].$t)
					}
					console.log('YOU CLICKED BIRD!');

				}, function(error) {

					console.log('error no birds here', error);

				})
		}

		petCtrl.horse = function(){
			petCtrl.animals = 'Horse';
		 	petFactory.getHorseList()

		 	.then( function(response){
		 		var data = response.data || {};

		 		var horseBreeds = data.petfinder.breeds.breed;
		 		petCtrl.breedList = [];
		 		for(var i = 0; i < horseBreeds.length; i++){
		 			petCtrl.breedList.push(horseBreeds[i].$t)
		 		}
		 		console.log('you want a HORSE!!');

		 	}, function(error){
		 		console.log('error no horses here', error);

		 	})
		}
	}
	// End push function for searching breeds functionality	
	
//Beginning user input http call to request animals in user's location
	petCtrl.submitUserInfo = function(){
		var zip = petCtrl.zipCode;
		petCtrl.bool = false;
		// var animalType = petCtrl.animalType;
		// var animalBreed = petCtrl.animalBreed;

		console.log(zip);

		petFactory.findLocalShelters(zip)
			.then( function(response){
				var data = response.data || {};
				console.log(data)

				if(data.length != 0){
					petCtrl.userRequest = data.petfinder.shelters.shelter;
				}

				
				// if(data.length != 0){
				// 	var userInput = data.petfinder.pets.pet;
					
				// 		console.log(userInput);

			
				// 	var a_AnimalObjects = [];
				// 	for(var i =0; i < userInput.length; i++){
				// 		a_AnimalObjects.push(userInput[i].media.photos.photo);
				// 	}

				// 	console.log('this is animal objects', a_AnimalObjects);

				// 	for(var j=0; j< a_AnimalObjects.length;j++){

				// 	petCtrl.userRequest = a_AnimalObjects[j].$t;
			},
			function(error){
				console.log('that breed does not exist near you!');
			});
	}
}	

function petFactory($http){
	console.debug('controller loaded in factory');
	return {
		getDogList : function() {
			return $http.get('http://api.petfinder.com/breed.list?animal=dog&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json');
		},
		getCatList : function() {
			return $http.get('http://api.petfinder.com/breed.list?animal=cat&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json' )
		},
		getBirdList : function(){
			return $http.get('http://api.petfinder.com/breed.list?animal=bird&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json' )
		},
		getHorseList : function(){
			return $http.get('http://api.petfinder.com/breed.list?animal=horse&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json')
		},
		findLocalShelters : function(zip){
			return $http.get('http://api.petfinder.com/shelter.find?key=996c4da8bbb52f2bfb0fe093b80bef04&location='+zip+'&format=json');
		}
	}
}




