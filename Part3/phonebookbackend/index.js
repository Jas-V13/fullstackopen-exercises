const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

app.get('/info', (re, rp) => {
  const entries = persons.length
  const now = new Date()
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = dayNames[now.getDay()];
  const monthName = monthNames[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  const hours = now.getHours().toString().padStart(2, '0'); // Ensure two digits
  const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure two digits

  const formattedDate = `${dayName} ${monthName} ${day} ${year} ${hours}:${minutes}`;
  rp.send(
    `<div><div>Phonebook has info for ${entries} people </div><div>${formattedDate}</div></div>`  
  )
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)