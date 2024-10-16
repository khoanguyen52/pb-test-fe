import Person from "./Person";

const Content = ({ persons, onClick }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} onClick={onClick}></Person>
      ))}
    </div>
  );
};

export default Content;
