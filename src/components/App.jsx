import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './common/Header';
import Home from './pages/Home/Home';
import Registration from './pages/Registration/Registration';
// import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn/LogIn';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import authOperations from 'store/auth.operations';
import PrivateRoute from './common/PrivateRoute/PrivateRoute';
// import About from './pages/About/About';
import Contacts from './pages/Contacts/Contacts';
import authSelectors from 'store/auth.selectors';

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(
    authSelectors.getIsFetchingCurrentUser
  );
  // console.log(isFetchingCurrentUser)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (
      window.location.pathname === '/goit-react-hw-08-phonebook' &&
      !isFetchingCurrentUser
    ) {
      navigate('/');
    }
  }, [isFetchingCurrentUser, navigate]);

  if (isFetchingCurrentUser) {
    return null;
  }

  return (
    !isFetchingCurrentUser && (
      <>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute redirectTo="/login">
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login">
                <Contacts />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/about"
            element={
              <PrivateRoute redirectTo="/login">
                <About />
              </PrivateRoute>
            }
          /> */}
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </>
    )
  );
}

export default App;
