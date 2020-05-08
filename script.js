// we'll need two variables, one for each city on each end of the flight
var departure;
var destination;
var cheapFlights = $("#cheap-flights");
var airports = $("#airport-codes");
var selectAirports = $("<form>");
var airportsContainer = $("<figure>");
var price = 0;

// submit button is attached the div with ID: currency-picker
$("#currency-picker").on('change', function () {
	fetch(`https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=USD&to=${this.value}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
			"x-rapidapi-key": "ee974abcfbmsh2bbdc194e450a08p14b169jsnf711e272c365"
		}
	})
		.then(response => response.json())
		.then(response => {
			var conversionRate = response;
			$("#displayConversion").text(conversionRate * price);

		})
		.catch(err => {
			console.log(err);
		});
	})


 // submit button is attached the div with ID: AirportSelectionButton
 $(".container").on('click', "#AirportSelectionButton", function (event) {
	event.preventDefault();
	var departureAirport = $("#DepartureAirports").val();
	var destinationAirport = $("#DestinationAirports").val();
	console.log(departureAirport);
	console.log(destinationAirport);

	fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${departureAirport}/${destinationAirport}/2020-05-12?inboundpartialdate=2020-08-01`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "ee974abcfbmsh2bbdc194e450a08p14b169jsnf711e272c365"
		}
	})
		.then(response => {
			return response.json();
		})
		.then(response => {
			console.log(response);
			price = response.Quotes[0].MinPrice;
			console.log(price);

			$("#displayUSDPrice").text("$" + price + ".00");
		})
		.catch(err => {
			console.log(err);
		}); 


});


// submit button is attached the div with ID: flightform
$("#flightform").on('submit', function (event) {
	event.preventDefault();
	// empty out the section for the new incoming stuff
	airports.empty();
	// get user inputs of cities
	var departure = $("#departure").val();
	var destination = $("#destination").val();
	// run the api call functions for once for each city
	if (departure !== "" && destination !== "") {
		citySearch(departure, "Departure"); // (2nd parameters are for future ID names)
		citySearch(destination, "Destination"); // ^^
		generateFinalButton();
	}
})

async function citySearch(city, type) {
	airportsContainer.attr("id", "AirportsContainer");
	airportsContainer.attr("class", "container");
	cheapFlights.append(airportsContainer);
	// call API for the ${city} query
	fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=${city}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "ee974abcfbmsh2bbdc194e450a08p14b169jsnf711e272c365"
		}
	})
		.then(response => {
			return response.json();
		})
		.then(response => {
			console.log(response)

			// we will be making a dropdown menu for user to select the airport of the city
			selectAirports.attr("id", "SelectAirports");
			selectAirports.attr("class", "form");
			airportsContainer.append(selectAirports);


			// creating a select element
			var chooseAirport = $("<select>")
			// give the airport selection menu an ID named after city
			chooseAirport.attr("id", `${type}Airports`)
			// appending it to the "airports" area of page
			selectAirports.prepend(chooseAirport);
			// for each place (airport)
			response.Places.forEach(place => {

				// value for each selection is the Place ID, name shown is PlaceName
				chooseAirport.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);
			});
			//this heading is for user to know what they are selecting
			var selectAirport = $("<h4>");
			selectAirport.text(`Select ${type} City's Airport`);
			selectAirports.prepend(selectAirport);
		})
		.catch(err => {
			console.log(err);
		});
}

function generateFinalButton() {
	var airportSelectionButton = $("<button>"); // creating new input
	airportSelectionButton.text("Get Price");
	airportSelectionButton.attr("id", "AirportSelectionButton"); // button ID

	selectAirports.append($("<br>"));
	selectAirports.append($("<br>"));
	selectAirports.append(airportSelectionButton); // stick that button on!
}

//particlesJS("particles-js", {"particles":{"number":{"value":80,"density":{"enable":true,"value_area":800}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;


/*

function onClick() {
	event.preventDefault();
	var departureAirport = $("#DepartureAirports").val();
	var destinationAirport = $("#DestinationAirports").val();
	console.log(departureAirport);
	console.log(destinationAirport);
};
//var departureAirport = $("#departure");


	
	fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-05-07?inboundpartialdate=2020-06-01", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
			"x-rapidapi-key": "ee974abcfbmsh2bbdc194e450a08p14b169jsnf711e272c365"
		}
	})
		.then(response => {
			return response.json();
		})
		.then(response => {
			console.log(response);
		})
		.catch(err => {
			console.log(err);
		}); 


function currencyExchange() {
	fetch("https://currency-exchange.p.rapidapi.com/exchange?q=1.0&from=SGD&to=MYR", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "currency-exchange.p.rapidapi.com",
			"x-rapidapi-key": "ee974abcfbmsh2bbdc194e450a08p14b169jsnf711e272c365"
		}
	})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(err => {
			console.log(err);
		});
}
*/