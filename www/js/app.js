var App = angular.module("App", ["ionic"]);

App.service("AppSvc", ["$http", "$log", AppSvc]);
App.controller("AppCtrl", ["$scope", "AppSvc", "$log", "$ionicSideMenuDelegate", AppCtrl]);

function AppCtrl($scope, AppSvc, $log, $ionicSideMenuDelegate) {
	$scope.events = [];
	$scope.refresh = function() {
		// alert("Btn press");
		// $log.info("Btn press - log");
		AppSvc.getEvents($scope);
	}

	$scope.toggleMenu = function() {
    	$ionicSideMenuDelegate.toggleLeft();
    	 $log.info("Toggle -- menu");
  	};
}

function AppSvc($http, $log) {
	this.getEvents = function($scope) {
		$log.info("In getEvents / services");
		$http.jsonp("http://192.168.1.6:8080/CommunityApp/ws-sample1.php?callback=JSON_CALLBACK")
			.success(function(result){
				$log.info(JSON.stringify(result.events));
				$scope.events = result.events;
			});
	};
}