import Button from './Button'

const Person = ({ name, number, deleteContact }) => {
  return (
    <div>{name} {number} <Button text="delete" handleClick={deleteContact}/></div>
  )
}

export default Person