import { Component } from 'react';
import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { name, number } = form.elements;
    const contact = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    form.reset();
  };

  filterContacts = e => {
    this.setState({ filter: e.target.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const lovercase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lovercase)
    );
  };

  render() {
    const { filter, contacts } = this.state;

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
        <h2>Phonebook</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        <label>
          Find contacts by name
          <input type="text" value={filter} onChange={this.filterContacts} />
        </label>
        <ul>
          {contacts.map(({ id, name, number }) => (
            <li key={id} contacts={this.filteredContacts()}>
              {name}: {number}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
