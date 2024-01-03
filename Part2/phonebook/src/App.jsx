import { useState, useEffect } from 'react';
import axios from 'axios'




const DisplayNames = ({ persons, filter }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => (
      <li key={person.name}>{person.name} {person.phone}</li>
    ));
}

const PersonForm = ({ persons, newN, newP, setPers, setN, setP }) => {

  const newName = newN;
  const newPhone = newP;

  const addName = (ev) => {
    ev.preventDefault();
    let checkName = false;
    for (const i of persons) {
      if (i.name === newName) {
        alert(`${newName} is already added to phonebook`);
        checkName = true;
        break;
      }
    };
    if (checkName) return;
    const idName = newName.split(" ").slice(0, 1);
    const obj = {
      name: newName,
      phone: newPhone,
      id: idName[0]
    };
    setPers(persons.concat(obj));
    setN('');
    setP('');
  };

  const handleName = (ev) => {
    setN(ev.target.value);
  };
  const handlePhone = (ev) => {
    setP(ev.target.value);
  };

  return <form onSubmit={addName}>
    <div>
      name: <input value={newName} onChange={handleName} />
      <div>number: <input value={newPhone} onChange={handlePhone} /></div>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
}

const Filter =({setF}) => {
  const handleFilter = (ev) => {
    setF(ev.target.value);
  };
  return <div>filter shown with <input type="text" onChange={handleFilter}/></div>
}
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');


  useEffect(() => {
  axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setF={setNewFilter}/>
      <h2>Add new contact:</h2>
      <PersonForm persons={persons} newN={newName} newP={newPhone} setPers={setPersons} setN={setNewName} setP={setNewPhone} />
      <h2>Numbers</h2>
      <ul>
        <DisplayNames persons={persons} filter={newFilter} />
      </ul>
    </div>
  );
}

export default App;
