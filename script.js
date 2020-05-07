var departure;
var destination;

function destinationSearch(city) {
	console.log(city)
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
			var airRow = $("<div>")
			airportContent.append(airRow);
			response.Places.forEach(place => {
				console.log(place)
				airRow.append(`<div class='col-md-6'>${place.PlaceId}</div>`);
			})
		}).catch(err => {
			console.log(err);
		});
}
$("#flightform").on('submit', function (event) {
	event.preventDefault();
	destinationSearch($("#departure").val());
	console.log($("#departure").val());
	destinationSearch($("#destination").val());
	console.log($("#destination").val());
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