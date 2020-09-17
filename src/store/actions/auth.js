import axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';

export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfrKvNVXLlJ_opm8LU266FIYxkmhlsT5I';
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfrKvNVXLlJ_opm8LU266FIYxkmhlsT5I';
    }

    try {
      const response = await axios.post(url, authData);

      const data = response.data;
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

      localStorage.setItem('token', data.idToken);
      localStorage.setItem('userId', data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('login', email);

      const isOperator = !!email.match('operator');
      const isAdmin = !!email.match('admin');

      dispatch(authSuccess(data.idToken, email, isOperator, isAdmin));
      dispatch(autoLogout(data.expiresIn));
    } catch (error) {
      console.log(error);
    }
  };
}

export function authSuccess(token, login, isOperator, isAdmin) {
  return {
    type: AUTH_SUCCESS,
    token,
    login,
    isOperator,
    isAdmin,
  };
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const login = localStorage.getItem('login');
      const isOperator = !!login.match('operator');
      const isAdmin = !!login.match('admin');
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, login, isOperator, isAdmin));
        dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
}
