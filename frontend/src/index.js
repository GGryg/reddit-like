import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './Store'
import jwt_decode from 'jwt-decode';
import setAuthToken from './SetAuthToken';
import { setCurrentUser, logoutUser } from './actions/UsersActions';

const root = ReactDOM.createRoot(document.getElementById('root'));


if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  Store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    Store.dispatch(logoutUser());
    window.location.href = '/login'
  }
}


root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);
