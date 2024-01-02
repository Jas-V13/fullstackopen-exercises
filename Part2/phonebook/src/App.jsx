import { useState } from 'react';

const DisplayNames = ({ persons, filter }) => {
  return persons
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person => (
      <li key={person.name}>{person.name} {person.phone}</li>
    ));
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addName = (ev) => {
    ev.preventDefault();
    let checkName = false;
    for(const i of persons){
      if(i.name === newName) {
        alert(`${newName} is already added to phonebook`);
        checkName=true;
        break;}
    };
    if(checkName) return;
    const idName = newName.split(" ").slice(0,1)
    const obj = {
      name: newName,
      phone: newPhone,
      id: idName[0]
    };
    setPersons(persons.concat(obj));
    setNewName('');
    setNewPhone('');
  };

  const handleName = (ev) => {
    setNewName(ev.target.value);
  };
  const handlePhone = (ev) => {
    setNewPhone(ev.target.value);
  };
  const handleFilter = (ev) => {
    setNewFilter(ev.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input type="text" onChange={handleFilter} />
      <h2>Add new contact:</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName} />
          <div>number: <input value={newPhone} onChange={handlePhone} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <DisplayNames persons={persons} filter={newFilter} />
      </ul>
    </div>
  );
}

export default App;
