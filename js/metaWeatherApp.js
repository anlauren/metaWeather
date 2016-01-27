/**********************************************************************************************
	 metaWeatherApp.js is defining services and modules of the angular structure
**********************************************************************************************/

/*************************************** The App ********************************************/
var mtw = angular.module('mtw', []); // Creating the main ng-app metaweather (mtw) controller for rootscope

/*************************************** The Modules *****************************************/
mtw.controller('DataController', ['$scope', function($scope){ // Controlling the data we will send to the app and how
	$scope.listLang = ['EN', 'FR', 'SP'];
	$scope.listLocateType = ['State', 'Town', 'GPS'];
	$scope.listMetric =['Imperial', 'Metric'];
	$scope.listDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	$scope.lang = 'EN';
	$scope.locateType = 'Town';
	$scope.metric ='Metric';
	$scope.days = 4;
	$scope.req='Austin';


}]);

/*************************************** The Servives **********************************/