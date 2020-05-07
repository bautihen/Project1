var departure;
var destination;

function destinationSearch(city) {
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
			airRow.attr("id", "airport-picker")
			airportContent.append(airRow);
			response.Places.forEach(place => {
				airRow.append(`<option value="${place.PlaceId}">${place.PlaceName}</option>`);
			})
		}).catch(err => {
			console.log(err);
		});
}

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

$("#flightform").on('submit', function (event) {
	event.preventDefault();
	destinationSearch($("#departure").val());
	destinationSearch($("#destination").val());
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