import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContactById } from 'store/contacts.service';
import css from './ContactItem.module.css';

function ContactItem({ id, name, number, onDelete }) {
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    onDelete && onDelete();

    await dispatch(deleteContactById(id));
  };

  return (
    <li key={id} className={css.item}>
      <span className={css.name}>
        {name}: {number}
      </span>
      <button className={css.btn} type="button" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ContactItem;
