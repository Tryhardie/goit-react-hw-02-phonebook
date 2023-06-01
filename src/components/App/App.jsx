import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    const form = e.target;
    const { name, number } = form.elements;
    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    if (this.state.contacts.find(contact => contact.name === name.value)) {
      Notify.info(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    form.reset();
  };

  filteringInput = e => {
    this.setState({ filter: e.target.value });
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const lovercase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lovercase)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();
    return (
      <div
        style={{
          // height: '100vh',
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 28,
          color: '#010101',
        }}
      >
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact}></ContactForm>
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.filteringInput}></Filter>
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          ></ContactList>
        </Section>
      </div>
    );
  }
}

export default App;
