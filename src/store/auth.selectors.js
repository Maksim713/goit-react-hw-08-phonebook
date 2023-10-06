const getIsLoggedIn = state => state.isLoggedIn;
const getUserName = state => state.user.name;
const getUserEmail = state => state.user?.email || null;
const getToken = state => state.token;
const getIsFetchingCurrentUser = state => state.isFetchingCurrentUser || false;

const authSelectors = {
  getIsLoggedIn,
  getUserName,
  getUserEmail,
  getToken,
  getIsFetchingCurrentUser,
};

export default authSelectors;
