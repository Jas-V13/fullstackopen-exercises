import { useState, useEffect } from 'react';
import phonebookService from './services/phonebook'

const DeleteID = ({ persons, id, setPersons }) => {
  const nameID = persons.find(p => p.id === id)
  const [errorMsg, setErrorMsg] = useState('Error occurred');
  const deleteID = () => {
    if (window.confirm(`Delete ${nameID.name}?`)) {
      phonebookService
        .deleteID(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(e => {
          setErrorMsg(
            `'${nameID.name}' was already removed from server`
          )
          setTimeout(() => {
            setErrorMsg(null)
          }, 5000)
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

const PersonForm = ({ persons, newN, newP, setPers, setN, setP, setMsg }) => {
  const newName = newN;
  const newPhone = newP;
const changeNumber = (id, num) => {
  const url = `http://localhost:3001/persons/${id}`
  const pname = persons.find(i => i.id === id)
  const chName = { ...pname, phone: num }
  phonebookService.update(id, chName).then(i => {
    setPers(persons.map(n => n.id !== id ? n : i.data))
  })
}

  const addName = (ev) => {
    ev.preventDefault();
    let checkName = false;
    const obj = {
      name: newName,
      phone: newPhone
    };
    for (const i of persons) {
      if (i.name === newName) {
        //alert(`${newName} is already added to phonebook`);
        if (window.confirm(`Change ${i.name} number?`)) {
          changeNumber(i.id, newPhone);
          setMsg(`${i.name} number changed to ${newPhone}`)
                      setTimeout(() => {
                        setMsg(null)
                      }, 3000)
        }
        checkName = true;
        break;
      }
    };
    if (checkName) return;
    
    phonebookService
                    .create(obj)
                    .then(r => {
                      setPers(persons.concat(r.data))
                      setN('');
                      setP('');
                      setMsg(`${newName} added to the server`)
                      setTimeout(() => {
                        setMsg(null)
                      }, 3000)
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

const InfoMsg = ({message}) => {
  const Style = {
    color: 'green',
    fontStyle: 'italic',
    padding: 15,
    border: 1,
    borderStyle: 'solid',
    fontSize: 16
  }
  if (message === null || message === '') {
    return null
  }

  return (
    <div style={Style}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

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
      <InfoMsg message={infoMessage}/>
      <Filter setF={setNewFilter}/>
      <h2>Add new contact:</h2>
      <PersonForm persons={persons} newN={newName} newP={newPhone} setPers={setPersons} setN={setNewName} setP={setNewPhone} setMsg={setInfoMessage}/>
      <h2>Numbers</h2>
      <ul>
        <DisplayNames persons={persons} filter={newFilter} setPersons={setPersons}/>
      </ul>
    </div>
  );
}

export default App;
