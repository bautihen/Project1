var departure;
var destination;

$("#flightform").on('submit', function (event) {
	event.preventDefault();
	citySearch($("#departure").val());
	citySearch($("#destination").val());
	var airportSelectionButton = $("<input>");
	var airportContent = $("#airport-codes");
	airportSelectionButton.attr("type", "submit");
	airportSelectionButton.attr("value", "Get Prices");
	airportSelectionButton.attr("id", "airportSelectionButton");
	airportContent.append(airportSelectionButton);
})

function citySearch(city) {
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
			var airportContent = $("#airport-codes");
			var airRow = $("<select>")

			airportContent.append(airRow);
			response.Places.forEach(place => {
				airRow.attr("id", `airport-${place.PlaceId}`)
				airRow.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);
			})
		})
		.catch(err => {
			console.log(err);
		});
}



$("#airportSelectionButton").on('submit', function (event) {
	event.preventDefault();
	var departureAirport = $("#departure");



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