const { response } = require('express')
const morgan = require ('morgan')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
      { 
        name: "Arto Hellas", 
        number: "040-123456",
        id: 1
      },
      { 
        name: "Ada Lovelace", 
        number: "39-44-5323523",
        id: 2
      },
      { 
        name: "Dan Abramov", 
        number: "12-43-234345",
        id: 3
      },
      { 
        name: "Mary Poppendieck", 
        number: "39-23-6423122",
        id: 4
      }
    ]

app.get('/api/persons',(request,response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person){
        response.json(person)
    }
    else response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
app.get('/info',(request,response) => {
    let size = persons.length
    let date = new Date().toLocaleString();
    let body = `<p> PhoneBook has info for ${size} people </p> <p> ${date} </p> `
    response.send(body)
})

app.use(morgan('dev'))

app.post('/api/persons',(request,response) => {
    let person = request.body
    if (!person.name){
        response.status(400)
        response.json({error: 'person must contain a name'})
    }
    else if (!person.number){
        response.status(400)
        response.json({error: 'person must contain a number'})
    }
    else if (persons.find(each => each.name==person.name)){
        response.status(400)
        response.json({error: 'name must be unique'})
    }
    else{
        person.id= (Math.floor(Math.random()*10000000))
        persons = persons.concat(person)
        response.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)})
