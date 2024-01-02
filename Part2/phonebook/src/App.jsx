import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phone: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const addName = (ev) =>{
    ev.preventDefault()
    let checkName = false;
    for(const i of persons){
      if(i.name === newName) {
        alert(`${newName} is already added to phonebook`);
        checkName=true;
        break;}
    };
    if(checkName) return;
    const idName = newName.split(" ").slice(0,1)
    const obj ={
      name: newName,
      phone: newPhone,
      id: idName[0]
    }
    setPersons(persons.concat(obj))
    setNewName("")
  }
  const handleName = (ev) =>{
    setNewName(ev.target.value)
  }
  const handlePhone = (ev) =>{
    setNewPhone(ev.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleName}/>
          <div>number: <input value={newPhone} onChange={handlePhone} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(val =>  <li key={val.id}>{val.name} {val.phone}</li>)}
      </ul>
    </div>
  )
}

export default App