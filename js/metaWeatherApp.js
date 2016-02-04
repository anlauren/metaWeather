/*********************************************************************************************
	 metaWeatherApp.js is defining services and modules of the angular structure
**********************************************************************************************/


/*************************************** Globals ********************************************/
var md = new MobileDetect(window.navigator.userAgent);
var isMobile = true;
if(md.phone() == null)
	isMobile = false;
if(isMobile)
	alert("you are on mobile phone");


//check out if mobile device for future changes
/*************************************** The App ********************************************/
var mtw = angular.module('mtw', []); // Creating the main ng-app metaweather (mtw) controller for rootscope

/*************************************** The Modules *****************************************/
mtw.controller('DataController', ['$scope','$http','$sce', function($scope, $http,$sce){ // Controlling the data we will send to the app and how
	$scope.listLang = ['en', 'fr', 'sp'];
	$scope.listLocateType = ['Name', 'GPS'];
	$scope.listMetric =['imperial', 'metric'];
	$scope.listDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	$scope.listForecastType = ["every 3 hours", "daily"];
	$scope.forecastType = "daily";
	$scope.lang = 'en';
	$scope.locateType = 'Name';
	$scope.metric ='metric';
	$scope.days = 7;
	$scope.req='Austin';
	$scope.lon="0";
	$scope.lat="0";
	$scope.rootApi ="http://api.openweathermap.org/data/2.5/";
	$scope.apiKey="&appid=44db6a862fba0b067b1930da0d769e98";
	$scope.apiMode="&mode=json";
	$scope.contentResponse=$sce.trustAsHtml("<strong>No Result for display </strong>");
	$scope.clickCount =0;
	$scope.GPSList=[true, false];
	$scope.GPS = $scope.locateType =="GPS";
	$scope.req='Austin';
	$scope.setSearchField = function(){
/*		if (isMobile == true)
		{
			if($scope.locateType =="GPS")
			{
				$scope.GPS = true;
				console.log($scope.GPS);
				$scope.clickCount =0;
			}
			else if ($scope.locateType =="Name")
			{
				$scope.clickCount =0;
				$scope.GPS = false;
				console.log($scope.GPS);
			}
		}
		else{*/
			if($scope.clickCount > 0){ // here we are just preventing the initial click to show the list to have an impact on the page (only if not on mobile device...)
				if($scope.locateType =="GPS")
				{
					$scope.GPS = true;
					console.log($scope.GPS);
					$scope.clickCount =0;
				}
				else if ($scope.locateType =="Name")
				{
					$scope.clickCount =0;
					$scope.GPS = false;
					console.log($scope.GPS);
				}
			}
			else
				$scope.clickCount ++;			
/*		}*/

	}
	$scope.sendReq=  function(){ // function to send a request to the API
		var forecastType= "";
		var endApi ="";
		var locateType ="";
		var cnt = $scope.days;
		if($scope.forecastType== "every 3 hours"){//We set up the forecast type in the URL
			forecastType="forecast?";
			cnt = cnt*8; // We put up the number of forecasts up to the right number of days the user entered (there are 8 forecasts a day in this mode)
		}
		else{
			forecastType ="forecast/daily?";
		}
		if($scope.locateType== "Name"){// we set up the forecast location mode in the URL
			locateType="q="+$scope.req;
		}
		else{
			locateType="lat="+$scope.lat+"&lon="+$scope.lon;
		}

		var toSend = $scope.rootApi+forecastType+locateType+"&units="+$scope.metric+"&lang="+$scope.lang+"&cnt="+cnt+$scope.apiMode+$scope.apiKey;
		console.log(toSend);
		$http.get(toSend).then(function _getSuccess(response)
								{

									console.log(response);
									var data = response.data;
									if(data.cod =="200"){
										var city = data.city;
										var forecast = data.list;
										$scope.contentResponse = "<h4>Results found for <strong>" + city.name +" ("+ city.country + ") </strong> :</h4></br>";
										$scope.contentResponse += "Coordinates : "+ city.coord.lat + "/"+ city.coord.lon+"<br>";
										$scope.lat = city.coord.lat ;
										$scope.lon = city.coord.lon ;
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
									else if(data.cod=="404")
									{
										$scope.contentResponse = $sce.trustAsHtml("<em style='color:red;font-size:200%;opacity:o.8;'>Town not found</em>");
									}
									else
									{
										$scope.contentResponse = $sce.trustAsHtml("<em style='color:red;font-size:200%;opacity:o.8;'>Unexpected error</em>");
									}
								}
							, function _getFailure(response)
								{
									$scope.contentResponse ="ANSWER FAILED" + response ;
								}
							);
	};
}]);

/*************************************** The Servives **********************************/
