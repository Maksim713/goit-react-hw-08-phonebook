import { useState } from 'react';
import { useAddContactItemMutation } from 'store/contacts.service';
import InputField from '../InputField';
import css from './ContactForm.module.css';

const initialValue = { name: '', number: '' };

function ContactForm() {
  const [value, setValue] = useState(initialValue);
  const [addContactItem] = useAddContactItemMutation();

  const handleInputChange = e =>
    setValue(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = e => {
    e.preventDefault();
    addContactItem(value);
    setValue(initialValue);
  };

  const { name, number } = value;
  return (
    <form className={css.container} onSubmit={handleFormSubmit}>
      <InputField
        label="Name"
        value={name}
        type="text"
        name="name"
        pattern="^[A-Za-z\u0080-\uFFFF ']+$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
      />
      <InputField
        label="Number"
        value={number}
        type="tel"
        name="number"
        pattern="^(\+?[0-9.\(\)\-\s]*)$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
      />
      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
