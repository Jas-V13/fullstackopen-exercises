import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook'


const DeleteID = ({ persons, id, setPersons }) => {
  const nameID = persons.find(p => p.id === id)
  const deleteID = () => {
    if (window.confirm(`Delete ${nameID.name}?`)) {
      phonebookService
        .deleteID(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(e => {
          console.error(e);
        });
    }
  };

  return <button onClick={deleteID}>delete</button>;
};


const DisplayNames = ({ persons, filter, setPersons }) => {
  return persons
                .filter(i => i.name.toLowerCase().includes(filter.toLowerCase()))
                .map(person => (
                  <li key={person.id}>{person.name} {person.phone} <DeleteID persons={persons} id={person.id} setPersons={setPersons}/></li>
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
    const obj = {
      name: newName,
      phone: newPhone
    };
    phonebookService
                    .create(obj)
                    .then(r => {
                      setPers(persons.concat(r.data))
                      setN('');
                      setP('');
                    })
    
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
  phonebookService
                  .getAll()
                  .then(r => {
                    setPersons(r.data)
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
        <DisplayNames persons={persons} filter={newFilter} setPersons={setPersons}/>
      </ul>
    </div>
  );
}

export default App;
