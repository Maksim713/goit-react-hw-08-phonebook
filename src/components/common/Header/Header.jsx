import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import authOperations from 'store/auth.operations';
import authSelectors from 'store/auth.selectors';
import Container from '../Container';
import css from './Header.module.css';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const userEmail = useSelector(authSelectors.getUserEmail);
  const onClickLogOut = () => {
    dispatch(authOperations.logOut());
  };

  return (
    <header className={css.container}>
      <Container>
        <div className={css.innerContainer}>
          <div className={css.userMenu}>
            <NavLink to="/" className={css.userBtn}>
              Home
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/contacts" className={css.userBtn}>
                Contacts
              </NavLink>
            )}
            {/* <NavLink to="/about" className={css.userBtn}>
              About
            </NavLink> */}
          </div>

          {isLoggedIn ? (
            <div>
              Welcome, {userEmail}
              <button className={css.userBtn} onClick={onClickLogOut}>
                Logout
              </button>
            </div>
          ) : (
            <div className={css.userMenu}>
              <NavLink to="/login" className={css.userBtn}>
                Login
              </NavLink>
              <NavLink to="/registration" className={css.userBtn}>
                Register
              </NavLink>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
