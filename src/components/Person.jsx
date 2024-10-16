const Person = ({ person, onClick }) => {
  return (
    <li>
      {person.name} {person.number}
      <button value={person.id} onClick={onClick}>
        delete
      </button>
    </li>
  );
};

export default Person;
