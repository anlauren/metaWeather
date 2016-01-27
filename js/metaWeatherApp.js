/**********************************************************************************************
	 metaWeatherApp.js is defining services and modules of the angular structure
**********************************************************************************************/

/*************************************** The App ********************************************/
var mtw = angular.module('mtw', []); // Creating the main ng-app metaweather (mtw) controller for rootscope

/*************************************** The Modules *****************************************/
mtw.controller('VarCtrl', ['$scope', function($scope){ // just a controller example for now
	$scope.a = 0;
}]);

/*************************************** The Servives **********************************/