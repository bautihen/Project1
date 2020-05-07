// we'll need two variables, one for each city on each end of the flight
var departure;
var destination;
var airports = $("#Airports");
var cityAirports = $("<form>");
var airportsContainer = $("<figure>");
var cheapFlights = $("#CheapFlights");

// submit button is attached the div with ID: flightform
$("#GetAirports").on('submit', function (event) {
	event.preventDefault();
	// empty out the section for the new incoming stuff
	airports.empty();
	// get user inputs of cities
	var departure = $("#Departure").val();
	var destination = $("#Destination").val();
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
			
			airportsContainer.append(cityAirports);
			// creating a select element
			var chooseAirport = $("<select>")
			// appending it to the "airports" area of page
			cityAirports.prepend(chooseAirport);
			// for each place (airport)
			response.Places.forEach(place => {
				// give the airport selection menu an ID named after city
				chooseAirport.attr("id", `${type}Airports`)
				// value for each selection is the Place ID, name shown is PlaceName
				chooseAirport.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);
			});
			//this heading is for user to know what they are selecting
			var selectAirport = $("<h4>");
			selectAirport.text(`Select ${type} City's Airport`);
			cityAirports.prepend(selectAirport);
		})
		.catch(err => {
			console.log(err);
		});
}

function generateFinalButton() {
	var airportSelectionButton = $("<input>"); // creating new input
	airportSelectionButton.attr("type", "submit"); // it will be a submit button
	airportSelectionButton.attr("value", "Get Prices"); // button name
	airportSelectionButton.attr("id", "AirportSelectionButton"); // button ID

	cityAirports.append($("<br>"));
	cityAirports.append($("<br>"));
	cityAirports.append(airportSelectionButton); // stick that button on!
}


$("#AirportSelectionButton").on('submit', function (event) {

	console.log("boop");
});
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