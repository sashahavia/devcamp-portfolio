$(document).ready(function(){
	// alert(":)");
	
	var d = new Date();
    var	n = d.getDay();
    console.log(n);

	$("#start").click(function(){
		$(".sect-banner").toggle();
		$("#enterValues").toggle();
	});

	$("#menu-icon i").click(function() {
		$("#navigation").slideToggle();	
	});

	$("#menu-icon2 i").click(function() {
		$("#navigation").slideToggle();	
	});

	// Toogle navigation options 

	function fromCityWeather (fromCity) {
		$.getJSON(
			 "http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: fromCity,
				cnt: 7,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
				units: "Imperial"
			},
			function(response){
				console.log(response);
				 // If we don't get data back
                if(response.cod != 200){
                    alert(response.message);
                } else {
                	$("#enterValues").toggle();
					$("#result").toggle();
                }
                var day = [];
                var weather = [];
                var temp = [];
                var iconUrl = "";
                var iconName = "";
                var icon = "";

                $("#fromCity h2").html(fromCity);
                // Save the data in vars
                for(var i = 0; i < 7; i++){
                	weather[i] = response.list[i].weather[0].main;
                	temp[i] = response.list[i].temp;
                	day_temp = temp[i].day;
                	night_temp = temp[i].night;
                	day[i] = dayOfTheWeek(n);
                	if( n === 6 ){
                		n = 0;
                	} else {
                		n += 1;
                	}
                	iconUrl = "images/icons/" + response.list[i].weather[0].icon + ".png";
                	icon = response.list[i].weather[0].icon;
					iconName = ".icon" + i;
					// console.log(icon);
					// console.log(iconName);
					// console.log(iconUrl);
					if(i === 0){
						$("#fromCity " + iconName + " p").html("NOW");
					} else {
						$("#fromCity " + iconName + " p").html(day[i]);
					}
					// $("#fromCity " + iconName + " img").attr("src" , iconUrl);
					if (iconUrl){
						$("#fromCity " + iconName + " img").attr("src" , iconUrl);
					} else {
						$("#fromCity " + iconName + " img").attr("src" , "images/icons/01n.png");
					}
					$("#fromCity " + iconName + " #day").html("Day:   " + day_temp.toFixed(0) + "&#176;");
					$("#fromCity " + iconName + " #night").html("Night: " + night_temp.toFixed(0)+ "&#176;");
	                // console.log(weather[i]);
	                // console.log(day_temp);
	                // console.log(night_temp);
	                // console.log(day[i]);
                }
                n = 0; 
			}
			 
		);
		
	}

	function toCityWeather (toCity){
		
		$.getJSON(
			"http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: toCity,
				cnt: 7,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
				units: "Imperial"
			},
			function(response){
				console.log(response);
				 // If we don't get data back
                if(response.cod != 200){
                    alert(response.message);
                }

               	var day2 = [];
                var weather = [];
                var temp = [];
                var iconUrl = "";
                var iconName = "";
                var icon = "";
                var toLon = "";
				var toLat = "";
                $("#toCity h2").html(toCity);
                
                // Save the data in vars
                for(var i = 0; i < 7; i++){
                	weather[i] = response.list[i].weather[0].main;
                	temp[i] = response.list[i].temp;
                	day2[i] = dayOfTheWeek(n);
                	if( n === 6 ){
                		n = 0;
                	} else {
                		n += 1;
                	}
                	
	                day_temp = temp[i].day;
                	night_temp = temp[i].night;

                	iconUrl = "images/icons/" + response.list[i].weather[0].icon + ".png";
                	icon = response.list[i].weather[0].icon;
					iconName = ".icon" + i;
					// console.log(icon);
					// console.log(iconName);
					// console.log(iconUrl);
					if(i === 0){
						$("#toCity " + iconName + " p").html("NOW");
					} else {
						$("#toCity " + iconName + " p").html(day2[i]);
					}
					$("#toCity " + iconName + " img").attr("src" , iconUrl);
					$("#toCity " + iconName + " #day").html("Day: " + day_temp.toFixed(0)+ "&#176;");
					$("#toCity " + iconName + " #night").html("Night: " + night_temp.toFixed(0)+ "&#176;");
	                // console.log(weather[i]);
	                // console.log(day_temp);
	                // console.log(night_temp);
	                // console.log(day2[i]);
                }
                
			}
			
		);
	}

	function dayOfTheWeek (n) {
		
        switch (n) {
		    case 0:
		        return day = "SUN";
		        break;
		    case 1:
		        return day = "MON";
		        break;
		    case 2:
		        return day = "TUE";
		        break;
		    case 3:
		        return day = "WED";
		        break;
		    case 4:
		        return day = "THU";
		        break;
		    case 5:
		        return day = "FRI";
		        break;
		    case 6:
		        return day = "SAT";
		        break;
		}

	}

	// Get distance between two points
	
	function distance(lat1, lon1, lat2, lon2) {
	  	var p = 0.017453292519943295;    // Math.PI / 180
	 	var c = Math.cos;
	  	var a = 0.5 - c((lat2 - lat1) * p)/2 + 
	          c(lat1 * p) * c(lat2 * p) * 
	          (1 - c((lon2 - lon1) * p))/2;

	  	var result = 7918 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
	  	$("#distance").html("Your travel distance is " + result.toFixed(2) + " miles.");
	  	return result;
	}

	// set map values based on weather API data

	function setMapPoints (fromLon,fromLat, toLon, toLat){
		console.log(fromLon + " " + fromLat);
		console.log(toLon + " " + toLat);
		var from = new google.maps.LatLng(fromLat,fromLon);
		var to = new google.maps.LatLng(toLat, toLon);
		var d = distance(fromLat,fromLon, toLat, toLon);
		console.log("d = " + d);
		if ( d < 100){
			d = 8;
		}else if ( d < 500){
			d = 6;
		} else if ( d < 1000 ){
			d = 5;
		} else if (d < 4000 ){
			d = 3;
		} else {
			d = 2;
		}
		initialize(from , to, d);

		google.maps.event.addDomListener(window, 'load', initialize);
	}
	// map function
	function initialize(fromC, toC, x) {
		
		var mapProp = {
			center: fromC,
		  	zoom: x,
		  	mapTypeId:google.maps.MapTypeId.ROADMAP
		};

		var myTrip=[fromC,toC];
		var flightPath = new google.maps.Polyline({
  			path:myTrip,
  			strokeColor:"#44567F",
  			strokeOpacity:0.8,
  			strokeWeight:5
  		});

		var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
		flightPath.setMap(map);
	}
				

	$("#submit").click(function(event){
		event.preventDefault();
		var fromCity = $("#fromCity").val();
		var toCity = $("#toCity").val();
		fromCityWeather (fromCity);
		toCityWeather (toCity);
		var fromLon = "";
		var fromLat = "";
		var toLon = "";
		var toLat = "";
		var fCoord;
		var tCoord;

		$.getJSON(
			"http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: fromCity,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
			},
			function(data){
				if(data.cod != 200){
                    alert(data.message);
                }
				fromLon = data.city.coord.lon;
				fromLat = data.city.coord.lat;
				console.log(fromLon);
				// if tCoord has already been initialized
				if((toLat) & (toLon)) {
                    setMapPoints (fromLon,fromLat, toLon, toLat);
                }
				
			}
		);

		$.getJSON(
			"http://api.openweathermap.org/data/2.5/forecast/daily",
			{
				q: toCity,
				appid: "4222d4e937e261a81e1d84fa1e3f669c",
			},
			function(data){
				if(data.cod != 200){
                    alert(data.message);
                }
				toLon = data.city.coord.lon;
				toLat = data.city.coord.lat;
				console.log(toLon);
				if((fromLat) & (fromLon) ) {
                    setMapPoints (fromLon,fromLat, toLon, toLat);
                }
			}
		);

	});

	


});