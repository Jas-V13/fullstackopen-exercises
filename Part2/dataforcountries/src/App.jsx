import { useEffect, useState } from 'react';
import countrySearch from './services/countries';
import weatherInfo from './services/weather';

const ShowCountry = ({country}) =>{
  const [visible, setVisible] = useState(false);
  const Style = {display: visible ? 'block' : 'none',};
  const ShowStat = () => {
    setVisible(!visible);
  }
  return (
    <div><button onClick={ShowStat}>show</button>
    <div style={Style} className='show-class'>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>

      <h3>languages:</h3>
      <ul>
        {country.languages && Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
    </div>)
}

const DisplayCountry = ({ countries, filter, count }) => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const [weatherContainer, setWeatherContainer] = useState(null);

  useEffect(() => {
    if (count === 1) {
      const filteredCountry = countries.find(i => i.name.common.toLowerCase().includes(filter.toLowerCase()));
      
      if (filteredCountry) {
        const lat= filteredCountry.capitalInfo.latlng[0];
        const lon= filteredCountry.capitalInfo.latlng[1];
        weatherInfo.getData(lat, lon, apiKey)
          .then(e => {
            setWeatherContainer(e.data);
          })
          .catch(error => console.error("Error fetching data:", error));
      }
    }
  }, [count, countries, filter, apiKey]);

  if (count > 10) {
    return;
  }

  if (count === 1) {
    const filteredCountry = countries.find(i => i.name.common.toLowerCase().includes(filter.toLowerCase()));

    if (!filteredCountry) {
      return <p>No countries found</p>;
    }

    return (
      <div>
        <h1>{filteredCountry.name.common}</h1>
        <p>Capital: {filteredCountry.capital}</p>
        <p>Area: {filteredCountry.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(filteredCountry.languages).map((language, i) => (
            <li key={i}>{language}</li>
          ))}
        </ul>
        <img src={filteredCountry.flags.png} alt={`Flag of ${filteredCountry.name.common}`} />
        <h3>Weather in {filteredCountry.capital}</h3>
        {weatherContainer ? (
          <div>
            <p>Wind: {weatherContainer.wind.speed} m/s</p>
            <p>Temperature: {weatherContainer.main.temp - 273.15}°C </p>
            <img src={`https://openweathermap.org/img/wn/${weatherContainer.weather[0].icon}.png`} width={'250px'} />
            {/* Add other weather details if needed */}
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    );
  }

  return (
    <ul>
      {countries.filter(i => i.name.common.toLowerCase().includes(filter.toLowerCase()))
        .map(e => (
          <li key={e.name.common} style={{ display: 'flex' }}>
            {e.name.common} <ShowCountry country={e} />
          </li>
        ))
      }
    </ul>
  );
};

function App() {
  const [filterMessage, setFilterMessage] = useState('');
  const [filter, setFilter] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    countrySearch.getAll()
      .then(e => {
        setAllCountries(e.data);
      })
      .catch(e => {
        console.error('Error fetching countries:', e);
      });
  }, []);

  useEffect(() => {
    setCount(allCountries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())).length);
    if (count > 10) {
      setFilterMessage('Too many matches, please specify');
    } else {
      setFilterMessage('');
    }
  }, [filter, allCountries]);

  const handleFilter = (ev) => {
    setFilter(ev.target.value);
  };

  return (
    <div>
      find countries <input type='text' onChange={handleFilter} />
      <p>{filterMessage}</p>
      <DisplayCountry filter={filter} countries={allCountries} count={count}/>
    </div>
  );
}

export default App;
