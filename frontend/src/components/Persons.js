import Person from './Person'

const Persons = ({ persons, filterName, deleteContact }) => {
    return (
        <div>
            {persons.map(person =>
                <Person key={person.name} name={person.name} 
                number={person.number} deleteContact={() => deleteContact(person.id, person.name)}/>
            ).filter(person => person.key.toLowerCase().includes(filterName.toLocaleLowerCase()))}
        </div>
    )
}

export default Persons