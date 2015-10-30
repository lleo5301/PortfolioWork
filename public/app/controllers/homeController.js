//home controller
app.controller('homeController', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout){
	console.log('controller running');
	$scope.heading =  "Hello my name is Leonardo Quintero and I'm a Full-Stack Developer";


	//lets get the backgrounds from the api
	$http.get('../api/backgrounds').then(setBackgrounds);

	function setBackgrounds(res){
		var i_count = 0;
		// console.log(res.data);
		$scope.backgrounds = res.data.data;
		console.log($scope.backgrounds);

		$interval(function(){
			if(i_count > $scope.backgrounds.length -1 ){
				i_count = 0;
			}
			$scope.img = 'img/'+$scope.backgrounds[i_count];
			console.log($scope.img);
			i_count ++;

		}, 10000);
		

	}


}])