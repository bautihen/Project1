// we'll need two variables, one for each city on each end of the flight
var departure;
var destination;
var airports = $("#Airports");

// submit button is attached the div with ID: flightform
$("#GetAirports").on('submit', function (event) {
	event.preventDefault();
	// empty out the section for the new incoming stuff
	airports.empty();
	// get user inputs of cities
	var departure = $("#Departure").val();
	var destination = $("#Destination").val();
	// run the api call functions for once for each city
	citySearch(departure, "Departure"); // (2nd parameters are for future ID names)
	citySearch(destination, "Destination"); // ^^
	generateFinalButton();
})

async function citySearch(city, type) {
	
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
			// creating a select element
			var cityAirports = $("<select>")
			// appending it to the "airports" area of page
			airports.prepend(cityAirports);
			// for each place (airport)
			response.Places.forEach(place => {
				// give the airport selection menu an ID named after city
				cityAirports.attr("id", `${type}Airports`)
				// value for each selection is the Place ID, name shown is PlaceName
				cityAirports.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);
			});
			//this heading is for user to know what they are selecting
			var selectAirport = $("<h4>");
			selectAirport.text(`Select ${type} City's Airport`);
			airports.prepend(selectAirport);
		})
		.catch(err => {
			console.log(err);
		});
}

function generateFinalButton() {
	var airports = $("#Airports"); // the form we will be adding the button to
	var airportSelectionButton = $("<input>"); // creating new input
	airportSelectionButton.attr("type", "submit"); // it will be a submit button
	airportSelectionButton.attr("value", "Get Prices"); // button name
	airportSelectionButton.attr("id", "AirportSelectionButton"); // button ID

	airports.append($("<br>"));
	airports.append(airportSelectionButton); // stick that button on!
}



$("#AirportSelectionButton").on('submit', function (event) {
	event.preventDefault();
	console.log("boop");
	//var departureAirport = $("#departure");

	/*
	
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
			}); */
})

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