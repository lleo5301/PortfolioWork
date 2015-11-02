var app = angular.module('portfolio', ['ngRoute', 'ngAnimate']);

//config
app.config(function($routeProvider, $locationProvider){
  
	//routes
	$routeProvider.when('/About',{
		templateUrl:'/views/about.html',
		controller: 'aboutController'
	}).
	when('/work',{
		templateUrl:'/views/work.html',
		controller: 'workController'
	}).
	when('/blog', {
		templateUrl:'/views/blog.html',
		controller: 'blogController'
	}).
    when('/projects/governmentStats',{
        templateUrl:'views/governmentstats.html',
        controller: 'statsController'
    }).
    otherwise({
		templateUrl:'views/home.html',
		controller:'homeController'
	})

})


