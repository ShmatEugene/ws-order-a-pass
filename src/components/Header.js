import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="header d-flex">
        <nav>
          <ul className="d-flex">
            <li>
              <NavLink to="/apply">Подать заявку</NavLink>
            </li>
            <li>
              <NavLink to="/" exact={true}>
                Просмотр заявок
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="account-management d-flex">
          <div className="username">operator</div>
          <div className="log-in">
            <a className="button button-green" href="/#">
              Войти
            </a>
          </div>
          <div className="sign-up">
            <a className="button button-green light" href="/#">
              Зарегистрироваться
            </a>
          </div>
        </div>
      </header>
      <div className="line"></div>
    </>
  );
}
