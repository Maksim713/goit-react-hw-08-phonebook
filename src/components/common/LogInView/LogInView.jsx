import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { capitalizeFirstLetter } from 'utils/utils';
import authOperations from 'store/auth.operations';
import authSelectors from 'store/auth.selectors';
import css from './LogInView.module.css';

const initFields = {
  email: '',
  password: '',
};

function LogInView({ navigateTo = '/' }) {
  const dispatch = useDispatch();
  const [fields, setFields] = useState(initFields);
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const navigation = useNavigate();

  const onInputChange = ({ target: { name, value } }) => {
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const onFormSubmit = async e => {
    e.preventDefault();
    await dispatch(authOperations.logIn(fields));
    setFields(initFields);
    navigation(navigateTo);
  };

  return !isLoggedIn ? (
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
                type="text"
              />
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <Navigate to={navigateTo} />
  );
}

export default LogInView;
