import PropTypes from 'prop-types';
import {
  useDeleteContactByIdMutation,
  useGetAllContactsQuery,
} from 'store/contacts.service';
import css from './ContactItem.module.css';

function ContactItem({ id, name, number }) {
  const [deleteContactById] = useDeleteContactByIdMutation();
  const { refetch } = useGetAllContactsQuery();

  const handleDelete = async () => {
    const result = await deleteContactById(id);
    if (result.data) {
      refetch();
    }
  };

  return (
    <li key={id} className={css.item}>
      <span className={css.name}>{name}</span>
      <span>{number}</span>
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
