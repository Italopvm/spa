angular.module('petSearchApp', [])
	.controller('petCtrl', petCtrl)
	.factory('petFactory', petFactory)

petCtrl.$inject = ['petFactory']
petFactory.$inject = ['$http']

function petCtrl(petFactory){
	var petCtrl = this;
	petCtrl.doggieLoader = true;

	petCtrl.dog = function(){
		petCtrl.animals = 'Dog';
	 	petFactory.getDogList()

			.then( function(response){
				var data = response.data || {};

				var dogBreeds = data.petfinder.breeds.breed;
				petCtrl.breedList = dogBreeds;
				console.log('YOU CLICKED DOG!');

			}, function(error) {

				console.log('error no dogs here', error);

			})
	} 

	petCtrl.cat = function(){
		petCtrl.animals = 'Cat';
		petFactory.getCatList()

			.then( function(response){
				var data = response.data || {};

				var catBreeds = data.petfinder.breeds.breed;
				petCtrl.breedList = catBreeds;
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
				petCtrl.breedList = birdBreeds;
				console.log('YOU CLICKED BIRD!');

			}, function(error) {

				console.log('error no birds here', error);

			})
	}
}
		// petCtrl.flipTable = function(){
		// 	petCtrl.checkTable = !petCtrl.checkTable;



function petFactory($http){
	console.debug('controller loaded in factory');
	return {
		getDogList : function() {
			return $http.get('http://api.petfinder.com/breed.list?animal='+ 'dog' +'&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json');
		},
		getCatList : function() {
			return $http.get('http://api.petfinder.com/breed.list?animal=' + 'cat' + '&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json' )
		},
		getBirdList : function(){
			return $http.get('http://api.petfinder.com/breed.list?animal=' + 'bird' + '&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json' )
		}
	}
}