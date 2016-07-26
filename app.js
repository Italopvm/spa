angular.module('petSearchApp', [])
	.controller('petCtrl', petCtrl)
	.factory('petFactory', petFactory)

petCtrl.$inject = ['petFactory']
petFactory.$inject = ['$http']

function petCtrl(petFactory){
	var petCtrl = this;

	petCtrl.searchDogBreeds = function(){
		petFactory.getBreedList()

		.then(function(response){
			var data = response.data || {};
			
			var breeds = data.petfinder.breeds.breed;
			petCtrl.breedList = breeds;

			console.log("success!")

		}, function(error) {
			console.error('NO API RESPONSE for you', error)
		})

		petCtrl.flipTable = function(){
			petCtrl.checkTable = !petCtrl.checkTable;
		}
	}
}

function petFactory($http){
	console.debug('controller loaded in factory');
	return {
		getBreedList : function () {
			return $http.get('http://api.petfinder.com/breed.list?animal=dog&key=996c4da8bbb52f2bfb0fe093b80bef04&format=json')
		}
	}
}