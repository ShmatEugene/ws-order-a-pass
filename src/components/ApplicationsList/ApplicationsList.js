import React from 'react';
import axios from 'axios';
import Button from '../UI/Button';

function changeDateFormat(date) {
  return new Date(date).toLocaleDateString('en-GB');
}

export default function ApplicationsList() {
  const [orders, setOrders] = React.useState(null);
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isOrdersChanged, setIsOrdersChanged] = React.useState(false);
  React.useEffect(() => {
    axios
      .get('https://ws-order-a-pass.firebaseio.com/orders.json')
      .then((response) => {
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
    success: 'Одобрена',
    error: 'Отклонена',
  };

  const orderClickHandler = (key) => {
    orders[key].key = key;
    setSelectedOrder(orders[key]);
  };

  const changeStatusHandler = (status) => {
    let newOrders = { ...orders };
    newOrders[selectedOrder.key].status = status;
    setOrders(newOrders);
    setIsOrdersChanged(true);
  };

  const saveChangesHandler = () => {
    setLoading(true);
    axios
      .patch('https://ws-order-a-pass.firebaseio.com/orders.json', orders)
      .then((response) => {
        console.log(response);
        setLoading(false);
        setIsOrdersChanged(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderOrders = () => {
    return (
      orders &&
      Object.keys(orders)
        .slice(0)
        .reverse()
        .map((key) => {
          return (
            <tr key={key} onClick={() => orderClickHandler(key)}>
              <td>{changeDateFormat(orders[key].date)}</td>
              <td>{orders[key].name}</td>
              <td>{orderTypes[orders[key].type]}</td>
              <td className="align-table-right">
                <span className={`status ${orders[key].status}`}>
                  {statuses[orders[key].status]}
                </span>
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
          <Button disabled={!isOrdersChanged} onClick={saveChangesHandler}>
            {loading ? '...' : 'Сохранить изменения'}
          </Button>
        </div>
        {selectedOrder && (
          <div className="applications-info">
            <h3>Подробная информация</h3>
            <div className="line"></div>
            <div className="name">{selectedOrder.name}</div>
            <div className="email">{selectedOrder.email}</div>
            <div className="info-block">
              <div className="label">тип</div>
              <div className="value">{orderTypes[selectedOrder.type]}</div>
            </div>
            <div className="info-block">
              <div className="label">статус</div>
              <div className="value">{statuses[selectedOrder.status]}</div>
            </div>
            <div className="info-block">
              <div className="label">запрошен</div>
              <div className="value">{changeDateFormat(selectedOrder.date)}</div>
            </div>
            {selectedOrder.type === 1 ? (
              <div>
                <div className="info-block">
                  <div className="label">период действия</div>
                  <div className="value">11.01.20 - 13.09.20</div>
                </div>
                <div className="info-block">
                  <div className="label">цель посещения</div>
                  <div className="value">{selectedOrder.purpose}</div>
                </div>
              </div>
            ) : null}
            <div className="buttons-block">
              <Button onClick={() => changeStatusHandler('success')} type="success">
                Одобрить
              </Button>
              <Button onClick={() => changeStatusHandler('error')} type="error">
                Отклонить
              </Button>
            </div>
            <div className="buttons-block">
              {/* <select name="status" id="select-status">
              <option value="1">Пропуск готов</option>
              <option value="2">Одобрена</option>
            </select> */}
              <Button onClick={() => changeStatusHandler('ready')} type="ready">
                Пропуск готов
              </Button>
              <Button type="light">Печать</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
