import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from './UI/Button';

export default function Header() {
  const state = useSelector(({ auth }) => auth);
  const isAuthenticated = !!state.token;

  return (
    <>
      <header className="header d-flex">
        <nav>
          <ul className="d-flex">
            <li>
              <NavLink to="/" exact={true}>
                Подать заявку
              </NavLink>
            </li>
            <li>
              {isAuthenticated && (
                <NavLink to="/applications-list" exact={true}>
                  Просмотр заявок
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        <div className="account-management d-flex">
          <div className="username">{state.login && state.login.split('@')[0]}</div>
          <div className="log-in">
            {isAuthenticated ? (
              <NavLink to="/logout" exact={true}>
                <Button>Выйти</Button>
              </NavLink>
            ) : (
              <NavLink to="/auth" exact={true}>
                <Button>Войти</Button>
              </NavLink>
            )}
          </div>
          {/* <div className="sign-up">
            <a className="button button-green light" href="/#">
              Зарегистрироваться
            </a>
          </div> */}
        </div>
      </header>
      <div className="line"></div>
    </>
  );
}
