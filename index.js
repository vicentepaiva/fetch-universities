const BASE_URL = 'http://universities.hipolabs.com/search';

function fetchUniversities(queryParams) {
    if (queryParams.includes('limit')) 
        document.getElementById('countrySelect').value = '';
    

fetch (`${BASE_URL}${queryParams}`) 
    .then(response => response.json())
    .then(data => showUniversities(data))
    .catch(error => console.log(error));
}

fetchUniversities('?country=United+States');


function showUniversities(universities) {
    const universitiesList = document.getElementById('universitiesList');
    universitiesList.innerHTML = '';
    universities.forEach(university => {
        const universityItem = document.createElement('div');
        universityItem.textContent = university.name + ' - ' + university.country;
        universitiesList.appendChild(universityItem);
    })
    universities.sort((pirmeiraOcorrencia, segundaOcorrencia) => {
        const nomeA = pirmeiraOcorrencia.name.toUpperCase();
        const nomeB = segundaOcorrencia.name.toUpperCase();
        if(nomeA < nomeB) {
            return -1;
        }
        if(nomeA > nomeB) {
            return 1;
        }
        return 0;
    })
}

document.getElementById('countrySelect').addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    if(selectedCountry) {
        fetchUniversities(`?country=${selectedCountry}`);
    }
});

