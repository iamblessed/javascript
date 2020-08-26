const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// Search countries.json and filter it
const searchCountries = async searchText => {
	const res = await fetch('./data/africa.json');
	const countries = await res.json();

	// Get matches to current text input
	let matches = countries.filter(country => {
		const regex = new RegExp(`^${searchText}`, 'gi');
		return country.name.match(regex) || country.abbr.match(regex);
	});

	if (searchText.length === 0) {
		matches = [];
		matchList.innerHTML = '';
	}
	//console.log(matches)
	outputHtml(matches)
};
//Show output in HTML
const outputHtml = matches => {
	if (matches.length > 0) {
		const matchCountry = matches.map(match =>
			`<div class="card card-body mb-1"> 
			  <h4>${match.name}(${match.abbr}) <span class="text-primary">${match.capital}</span>
			  </h4>
			  <h5 class="text-danger">Independent Day: ${match.independence_day}</h5>
			  <span class="text-info">Population: ${match.population} &emsp; Size: ${match.geo_area}</span><br>
			  <small>Lat: ${match.lat} &ensp; Long: ${match.long}</small>
			</div>`).join('');
		//console.log(html);
		matchList.innerHTML = matchCountry;
	}
};

search.addEventListener('input', () => searchCountries(search.value));