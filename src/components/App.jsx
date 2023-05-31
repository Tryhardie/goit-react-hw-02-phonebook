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
    name: '',
    number: '',
  };

  handleChange = e => {
    const name = e.target.value;
    this.setState({ name: name });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const { name } = form.elements;
    const contact = {
      id: nanoid(),
      name: name.value,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
    form.reset();
  };

  render() {
    const contacts = this.state.contacts;

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
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add contact</button>
        </form>
        <h2>Contacts</h2>
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>{contact.name}: {contact.number}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
