import { useGetAllContactsQuery } from 'store/contacts.service';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter, setFilterValue } from 'store/phonebook.slice';
import { useEffect } from 'react';
import authSelectors from 'store/auth.selectors';
import InputField from '../InputField';
import Notification from '../Notification';
import ContactItem from '../ContactItem';
import css from './ContactsList.module.css';

function ContactsList() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  const {
    data: contacts,
    // error, isLoading
    refetch,
  } = useGetAllContactsQuery();

  useEffect(() => {
    if (isLoggedIn) refetch();
  }, [isLoggedIn, refetch]);

  const handleInputChange = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const filteredContacts =
    contacts !== undefined
      ? contacts.filter(it => it.name.includes(filter))
      : [];

  return (
    <div className={css.container}>
      <InputField
        label="Find contacts by name"
        value={filter}
        onChange={handleInputChange}
        type="text"
        name="filter"
      />

      {!filteredContacts.length ? (
        <Notification message="Contact list is empty." />
      ) : (
        <ul className={css.list}>
          {filteredContacts.map(({ id, name, number }) => (
            <ContactItem key={id} id={id} name={name} number={number} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactsList;
