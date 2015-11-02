//home controller
app.controller('homeController', ['$scope', '$http', '$interval', '$timeout', function($scope, $http, $interval, $timeout){
	console.log('controller running');
	$scope.heading =  "Hello my name is Leonardo and I'm a Full-Stack Developer";
	$scope.img = "optimized/background6.jpg";
	$scope.showText = false;

	//get icons
	$http.get('../api/icons').then(setIcons);

	// animation for text
	$timeout(function() {
        $scope.showText = true;
        $scope.ready=true;
    }, 1000);



	//set icons
	function setIcons(res){
		$scope.icons = res.data.data;
	}


}])