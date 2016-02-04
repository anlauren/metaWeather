/**********************************************************************************************
	 metaWeatherApp.js is defining services and modules of the angular structure
**********************************************************************************************/

/*************************************** The App ********************************************/
var mtw = angular.module('mtw', []); // Creating the main ng-app metaweather (mtw) controller for rootscope

/*************************************** The Modules *****************************************/
mtw.controller('DataController', ['$scope','$http','$sce', function($scope, $http,$sce){ // Controlling the data we will send to the app and how
	$scope.listLang = ['en', 'fr', 'sp'];
	$scope.listLocateType = ['State', 'Town', 'GPS'];
	$scope.listMetric =['imperial', 'metric'];
	$scope.listDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	$scope.listForecastType = ["every 3 hours", "daily"];
	$scope.forecastType = "every 3 hours";
	$scope.lang = 'en';
	$scope.locateType = 'Town';
	$scope.metric ='metric';
	$scope.days = 6;
	$scope.req='Austin';
	$scope.rootApi ="http://api.openweathermap.org/data/2.5/";
	$scope.apiKey="&appid=44db6a862fba0b067b1930da0d769e98";
	$scope.apiMode="&mode=json";
/*	$scope.endApiForecast ="&mode=json&appid=44db6a862fba0b067b1930da0d769e98";
	$scope.endApiDaily=	   "&cnt=3&appid=44db6a862fba0b067b1930da0d769e98"*/
	$scope.contentResponse=$sce.trustAsHtml("<strong>No Result for display </strong>");
	$scope.testUrl =  function(){
		var forecastType= "";
		var endApi ="";
		var cnt = $scope.days;
		if($scope.forecastType== "every 3 hours"){
			forecastType="forecast?q=";
			cnt = cnt*8;


		}
		else{
			forecastType ="forecast/daily?q=";
		}
		var toSend = $scope.rootApi+forecastType+$scope.req+"&units="+$scope.metric+"&lang="+$scope.lang+"&cnt="+cnt+$scope.apiMode+$scope.apiKey;
		console.log(toSend);
		$http.get(toSend).then(function _getSuccess(response)
								{

									console.log(response);
									var data = response.data;
									var city = data.city;
									var forecast = data.list;
									$scope.contentResponse = "<h4>Results found for <strong>" + city.name +" ("+ city.country + ") </strong> :</h4></br>";
									$scope.contentResponse += "Coordinates : "+ city.coord.lat + "/"+ city.coord.lon+"<br>";
									var tableBase = "<table class = 'table-striped'><thead><tr>";
									prevLength = data.list.length; 
									if($scope.forecastType == "every 3 hours"){	 // design of the presentation table changes with then mode selected by the user
										tableBase = "<table class='col-md-12 table-striped'><thead><tr><td>time</td><td>description</td><td>humidity(%)</td><td>temperature</td></tr></thead><tbody>";
									}
									else{
											tableBase = "<table class='col-md-12 table-striped'><thead><tr><td>time</td><td>description</td><td>humidity(%)</td><td>temperature</td></tr></thead><tbody>";
									}

									
									$scope.contentResponse += tableBase;
									for(var i = 0; i<prevLength; i++)// we are going to write all forecast table here
									{
										if($scope.forecastType == "every 3 hours"){		
											console.log("3hours a day forecast");
											$scope.contentResponse += "<tr><td>"+ forecast[i].dt_txt +"</td>"
											$scope.contentResponse += "<td>"+ forecast[i].weather[0].description +"</td>";
											$scope.contentResponse += "<td>" + forecast[i].main.humidity +"</td>";
											$scope.contentResponse += "<td>" + forecast[i].main.temp+"</td>";
											$scope.contentResponse += "</tr>";
										}
										else
										{
											$scope.contentResponse += "<tr><td> + "+ i +" days </td>"
											$scope.contentResponse += "<td>"+ forecast[i].weather[0].description +"</td>";
											$scope.contentResponse += "<td>" + forecast[i].humidity +"</td>";
											$scope.contentResponse += "<td>" + forecast[i].temp.day+"</td>";
											$scope.contentResponse += "</tr>";
											console.log("daily forecast");
										}
									}
									$scope.contentResponse += "</tbody></table>";
									$scope.contentResponse = $sce.trustAsHtml($scope.contentResponse);
								}
							, function _getFailure(response)
								{
									$scope.contentResponse ="ANSWER FAILED" + response ;
								}
							);
	};
}]);

/*************************************** The Servives **********************************/
/*http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid=44db6a862fba0b067b1930da0d769e98
http://api.openweathermap.org/data/2.5/daily?q=Austin&units=metric&lang=en&mode=json&cnt=3&appid=44db6a862fba0b067b1930da0d769e98
http://api.openweathermap.org/data/2.5/forecast?q=London,us&mode=xml&appid=44db6a862fba0b067b1930da0d769e98*/