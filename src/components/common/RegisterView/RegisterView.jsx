import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { capitalizeFirstLetter } from '../../../utils/utils';
import authOperations from '../../../store/auth.operations';
import css from './RegisterView.module.css';

const initFields = {
  name: '',
  email: '',
  password: '',
};

function RegisterView() {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initFields);

  const onInputChange = ({ target: { name, value } }) => {
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(authOperations.register(fields));
    setFields(initFields);
  };

  return (
    <div>
      <form className={css.form} onSubmit={onFormSubmit}>
        {Object.keys(fields).map(key => (
          <div key={key}>
            <label>
              {capitalizeFirstLetter(key)}{' '}
              <input
                value={fields[key]}
                name={key}
                onChange={onInputChange}
                type={key}
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegisterView;
