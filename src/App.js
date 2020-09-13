import React from 'react';

function App() {
  return (
    <div className="wrap">
      {/* <div className="navigation">
        <nav>
          <ul>
            <li>
              <a className="active" href="/#1">
                Подать заявку
              </a>
            </li>
            <li>
              <a href="/#2">Просмотр заявок</a>
            </li>
          </ul>
        </nav>
      </div> */}
      <div className="main">
        <div className="content">
          <header className="header d-flex">
            <nav>
              <ul className="d-flex">
                <li>
                  <a className="active" href="/#1">
                    Подать заявку
                  </a>
                </li>
                <li>
                  <a href="/#2">Просмотр заявок</a>
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
          <section className="applications-list-section section-indent">
            <h2>Список заявок</h2>
            <div className="applications-list d-flex">
              <div className="applications-table">
                <div className="line"></div>
                <table>
                  <thead>
                    <tr>
                      <th className="table-date">Дата</th>
                      <th className="table-name">ФИО</th>
                      <th className="table-type">Тип пропуска</th>
                      <th className="table-status align-table-right">Статус</th>
                      <th className="table-photo align-table-right">Фото</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>11/09/2020</td>
                      <td>К. К. Константинопольский</td>
                      <td>Постоянный</td>
                      <td className="align-table-right">
                        <span className="status ready">Пропуск готов</span>
                      </td>
                      <td className="table-photo-content">
                        <div className="photo-placholder"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>11/09/2020</td>
                      <td>К. К. Константинопольский</td>
                      <td>Постоянный</td>
                      <td className="align-table-right">
                        <span className="status pending">Рассматривается</span>
                      </td>
                      <td className="table-photo-content">
                        <div className="photo-placholder"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>11/09/2020</td>
                      <td>К. К. Константинопольский</td>
                      <td>Постоянный</td>
                      <td className="align-table-right">
                        <span className="status success">Одобрена</span>
                      </td>
                      <td className="table-photo-content">
                        <div className="photo-placholder"></div>
                      </td>
                    </tr>
                    <tr>
                      <td>11/09/2020</td>
                      <td>К. К. Константинопольский</td>
                      <td>Постоянный</td>
                      <td className="align-table-right">
                        <span className="status error">Отклонена</span>
                      </td>
                      <td className="table-photo-content">
                        <div className="photo-placholder"></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <a className="button" href="/#">
                  Сохранить изменения
                </a>
              </div>
              <div className="applications-info">
                <h3>Подробная информация</h3>
                <div className="line"></div>
                <div className="name">
                  Константин <br /> Константинович <br /> Константинопольский
                </div>
                <div className="email">k.konstontinopolsky@mail.ru</div>
                <div className="info-block">
                  <div className="label">тип</div>
                  <div className="value">Временный</div>
                </div>
                <div className="info-block">
                  <div className="label">зарошен</div>
                  <div className="value">09.11.20</div>
                </div>
                <div className="info-block">
                  <div className="label">период действия</div>
                  <div className="value">11.01.20 - 13.09.20</div>
                </div>
                <div className="info-block">
                  <div className="label">цель посещения</div>
                  <div className="value">посещение музея учебной организации</div>
                </div>
                <div className="buttons-block">
                  <a className="button success" href="/#">
                    Одобрить
                  </a>
                  <a className="button error" href="/#">
                    Отклонить
                  </a>
                </div>
                <div className="buttons-block">
                  <select name="status" id="select-status">
                    <option value="1">Пропуск готов</option>
                    <option value="2">Одобрена</option>
                  </select>
                  <a className="button light" href="/#">
                    Печать
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
