import React from 'react';
import axios from 'axios';

export default function ApplicationsList() {
  const [orders, setOrders] = React.useState({ date: '1' });
  React.useEffect(() => {
    axios
      .get('https://ws-order-a-pass.firebaseio.com/orders.json')
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderOrders = () => {
    let or = [];
    Object.keys(orders).forEach((key, index) => {
      or.push({
        email: orders[key].email,
        endDate: '13.09.2020',
        key: key,
        name: orders[key].name,
        purpose: 'Музей',
        startDate: '11.09.2020',
        status: 'pending',
        type: 1,
      });
    });
    return or.map((order, index) => (
      <tr key={order.key}>
        <td>11/09/2020</td>
        <td>{order.name}</td>
        <td>Постоянный</td>
        <td className="align-table-right">
          <span className="status ready">Пропуск готов</span>
        </td>
        <td className="table-photo-content">
          <div className="photo-placholder"></div>
        </td>
      </tr>
    ));
  };

  return (
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
              {renderOrders()}
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
  );
}
