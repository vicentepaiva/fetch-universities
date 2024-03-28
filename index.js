const BASE_URL = 'http://universities.hipolabs.com/search';

const countryValues = {
    'brazil': 'Brazil',
    'United States': 'United States',
};

function fetchUniversities(queryParams) {
    const url = queryParams ? `${BASE_URL}${queryParams}` : BASE_URL;

    if (!queryParams || queryParams.includes('limit')) 
        document.getElementById('countrySelect').value = '';

    fetch(url)
        .then(response => response.json())
        .then(data => showUniversities(data))
        .catch(error => console.log(error));
}

fetchUniversities('');

function showUniversities(universities) {
    const universitiesList = document.getElementById('universitiesList');
    universitiesList.innerHTML = '';

    if (universities.length === 0) {
        universitiesList.textContent = 'Nenhuma lista de unversidades selecionada.';
    } else {
        universities.forEach(university => {
            const universityItem = document.createElement('div');
            universityItem.textContent = university.name + ' - ' + university.country;
            universitiesList.appendChild(universityItem);
        });
    }
}

document.getElementById('countrySelect').addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    if (selectedCountry) {
        fetchUniversities(`?country=${countryValues[selectedCountry]}`);
    } else {
       
        showUniversities([]);
    }
});
