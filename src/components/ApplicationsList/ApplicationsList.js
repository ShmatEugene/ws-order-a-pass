import React from 'react';
import axios from 'axios';
import Button from '../UI/Button';

export default function ApplicationsList() {
  const [orders, setOrders] = React.useState(null);
  const [orderAdditionalInfo, setOrderAdditionalInfo] = React.useState(null);
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

  const orderTypes = ['Постоянный', 'Временный'];
  const statuses = {
    ready: 'Пропуск готов',
    pending: 'Рассматривается',
    success: 'Одобрен',
    error: 'Отклонен',
  };

  const orderClickHandler = (key) => {
    orders[key].key = key;
    setOrderAdditionalInfo(orders[key]);
  };

  const approveHandler = () => {};

  const renderOrders = () => {
    console.log(orders);
    return (
      orders &&
      Object.keys(orders).map((key) => {
        return (
          <tr key={key} onClick={() => orderClickHandler(key)}>
            <td>11/09/2020</td>
            <td>{orders[key].name}</td>
            <td>{orderTypes[orders[key].type]}</td>
            <td className="align-table-right">
              <span className={`status ${orders[key].status}`}>{statuses[orders[key].status]}</span>
            </td>
            <td className="table-photo-content">
              <div className="photo-placholder"></div>
            </td>
          </tr>
        );
      })
    );
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
            <tbody>{renderOrders()}</tbody>
          </table>
          <a className="button" href="/#">
            Сохранить изменения
          </a>
        </div>
        <div className="applications-info">
          <h3>Подробная информация</h3>
          <div className="line"></div>
          <div className="name">{orderAdditionalInfo && orderAdditionalInfo.name}</div>
          <div className="email">{orderAdditionalInfo && orderAdditionalInfo.email}</div>
          <div className="info-block">
            <div className="label">тип</div>
            <div className="value">
              {orderAdditionalInfo && orderTypes[orderAdditionalInfo.type]}
            </div>
          </div>
          {orderAdditionalInfo && orderAdditionalInfo.type === 1 ? (
            <div>
              <div className="info-block">
                <div className="label">запрошен</div>
                <div className="value">09.11.20</div>
              </div>
              <div className="info-block">
                <div className="label">период действия</div>
                <div className="value">11.01.20 - 13.09.20</div>
              </div>
              <div className="info-block">
                <div className="label">цель посещения</div>
                <div className="value">{orderAdditionalInfo && orderAdditionalInfo.purpose}</div>
              </div>
            </div>
          ) : null}
          <div className="buttons-block">
            <Button onClick={() => approveHandler()} type="success">
              Одобрить
            </Button>
            <Button onClick={() => approveHandler()} type="error">
              Отклонить
            </Button>
          </div>
          <div className="buttons-block">
            <select name="status" id="select-status">
              <option value="1">Пропуск готов</option>
              <option value="2">Одобрена</option>
            </select>
            <Button type="light">Печать</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
