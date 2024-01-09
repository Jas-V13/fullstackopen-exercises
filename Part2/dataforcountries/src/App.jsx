import { useEffect, useState } from 'react';
import countrySearch from './services/countries';
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
  if(count > 10) return;
  const filteredCountries = countries.filter(i => i.name.common.toLowerCase().includes(filter.toLowerCase()));
  if(count === 1){
    if (filteredCountries.length === 0) {
      return <p>No countries found</p>;
    }
    return (
    <div>
      <h1>{filteredCountries[0].name.common}</h1>

      <p>Capital: {filteredCountries[0].capital}</p>
      <p>Area: {filteredCountries[0].area} km²</p>

      <h3>languages:</h3>
      <ul>
      {Object.values(filteredCountries[0].languages).map((language, i) => (
        <li key={i}>{language}</li>
      ))}
    </ul>
    <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt}/>
    </div>)
  }
  
  return filteredCountries.map(e => (<li key={e.name.common} style={{ display: 'flex'}} >{e.name.common} <ShowCountry country={e}/></li>));
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
