// we'll need two variables, one for each city on each end of the flight
var departure;
var destination;

// submit button is attached the div with ID: flightform
$("#GetAirports").on('submit', function (event) {
	event.preventDefault();
	// get user inputs of cities
	var departure = $("#Departure").val();
	var destination = $("#Destination").val();
	// run the api call functions for once for each city
	citySearch(departure, "departure"); // (2nd parameters are for future ID names)
	citySearch(destination, "destination"); // ^^
})




function citySearch(city, type) {
	// call up the AirportCode section that we're about to add into
	var Airports = $("#Airports");
	// empty out the section for the new incoming stuff
	Airports.empty();
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
			// we will be making a dropdown menu for user to select the airport of the city
			console.log(response)
			// creating a select element
			var airRow = $("<select>")

			Airports.append(airRow);
			response.Places.forEach(place => {
				airRow.attr("id", `airport-${type}`)
				airRow.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);

			});
			if (type === "destination") { return (done = true) };
			if (done === true) { generateFinalButton(); }

		})
		.catch(err => {
			console.log(err);
		});
}

function generateFinalButton() {

	var airportSelectionButton = $("<input>"); // creating new input
	airportSelectionButton.attr("type", "submit"); // it will be a submit form
	airportSelectionButton.attr("value", "Get Prices"); // button name
	airportSelectionButton.attr("id", "AirportSelectionButton"); // button ID
	var airports = $("#Airports");
	airports.append(airportSelectionButton);
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