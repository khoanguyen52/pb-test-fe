import { useState, useEffect } from "react";
import Content from "./components/Content";
import ContactForm from "./components/ContactForm";
import Filter from "./components/Filter";
import Header from "./components/Header";
import Notification from "./components/Notification";
import contactService from "./services/contact";
import "./index.css";

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: "Arto Hellas", number: "123-456-7890" },
  // ]);

  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // initialize persons array by fetching data from json-server
  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    contactService.getAll().then((response) => setPersons(response.data));
  }, []);

  if (!persons) {
    return null;
  }

  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };
    const found = persons.find((contact) => contact.name === newContact.name);
    if (found) {
      if (
        window.confirm(
          `${found.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        contactService.update(found.id, newContact).then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== found.id ? person : response.data
            )
          );
        });
        setMessage(`${found.name} was successfully updated`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    } else {
      // axios
      //   .post("http://localhost:3001/persons", newContact)
      contactService
        .create(newContact)
        .then((response) => setPersons(persons.concat(response.data)));
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (event) => {
    event.preventDefault();
    const id = event.target.value;
    const contact = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${contact.name} has already been removed from the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <Header title="Phonebook"></Header>
      <Notification type="message" message={message}></Notification>
      <Notification type="error" message={errorMessage}></Notification>
      <Filter filter={newFilter} onChange={handleFilterChange}></Filter>
      <Header title="Add New Contact"></Header>
      <ContactForm
        onSubmit={addContact}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      ></ContactForm>
      <Header title="Number"></Header>
      <Content persons={filteredPersons} onClick={deleteContact}></Content>
    </div>
  );
};

export default App;
