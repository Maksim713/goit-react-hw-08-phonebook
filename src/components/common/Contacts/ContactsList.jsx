import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilterValue } from 'store/phonebook.slice';
import { getAllContacts, deleteContactById } from 'store/contacts.service';
import InputField from 'components/common/InputField';
import { useEffect } from 'react';
import ContactItem from 'components/common/ContactItem';
import css from './ContactsList.module.css';

const ContactsList = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const handleInputChange = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const handleDeleteContact = async id => {
    await dispatch(deleteContactById(id));
  };

  const filteredContacts = contacts.data.filter(it => it.name.includes(filter));

  return (
    <>
      <div className={css.input}>
        <InputField
          label="Find contacts by name"
          value={filter}
          type="text"
          name="filter"
          onChange={handleInputChange}
        />
      </div>

      <div className={css.container}>
        {contacts.status === 'loading' && <h1>Loading...</h1>}
        {contacts.status === 'failed' && <h3>Error: {contacts.error}</h3>}
        {contacts.status === 'succeeded' && (
          <ul>
            {filteredContacts.map(({ id, name, number }) => (
              <ContactItem
                key={id}
                id={id}
                name={name}
                number={number}
                onDelete={() => handleDeleteContact(id)}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ContactsList;
