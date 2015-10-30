var app = angular.module('portfolio', ['ngRoute', 'ngAnimate']);

//config
app.config(function($routeProvider, $locationProvider){

	//routes
	$routeProvider.when('/About',{
		templateUrl:'/views/about.html',
		controller: 'aboutController'
	}).
	when('/Work',{
		templateUrl:'/views/work.html',
		controller: 'workController'
	}).
	when('/Blog', {
		templateUrl:'/views/blog.html',
		controller: 'blogController'
	}).otherwise({
		templateUrl:'views/home.html',
		controller:'homeController'
	})



	$locationProvider.html5Mode(true);
})