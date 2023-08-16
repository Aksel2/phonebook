import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookService from './services/numbers'
import Notification from './components/Notification'


const Heading = ({ text }) => {
  return (
    <h2>{text}</h2>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageIsVisable, setMessageIsVisable] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
  }, [])


  const changeMessageVisability = () => {
    setMessageIsVisable(true);

    setTimeout(() => {
      setMessageIsVisable(false)
    }, 5000);
  }

  const addNewContact = (event) => {
    event.preventDefault();
    checkIfPersonAlreadyExists(newName) ? changeExistingContact() : addNewPerson()
  }


  const changeExistingContact = () => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const updatePerson = persons.filter(e => e.name === newName)
      const updateId = updatePerson[0].id
      console.log("id",updateId);
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .update(updateId, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          emptyForms()
        })
        .catch(error => {
          setIsErrorMessage(true)
          setMessage(`Information of ${newName} has already been removed from server`)
          changeMessageVisability()
          console.log("here");
          console.log(error);
        })
    }

  }

  const addNewPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    phonebookService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setIsErrorMessage(false)
        setMessage(`Added ${newName}`)
        changeMessageVisability()
        emptyForms()
      })

  }

  const emptyForms = () => {
    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      phonebookService
        .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const checkIfPersonAlreadyExists = (name) => {
    const personToCheck = {
      name: name
    }
    return persons.filter(e => e.name === personToCheck.name).length > 0 ? true : false
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }
  return (
    <div>
      <Heading text="Phonebook" />
      {messageIsVisable && <Notification message={message} isErrorMessage={isErrorMessage}/>}
      <Filter change={handleFilterChange} />
      <Heading text="add a new" />
      <PersonForm newName={newName} newNumber={newNumber} addNewContact={addNewContact} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <Heading text="Numbers" />
      <Persons persons={persons} filterName={filterName} deleteContact={deleteContact} />
    </div>
  )
}

export default App