import React from 'react';
import classnames from 'classnames';
import * as calendar from './Calendar';

export default function Calendar(props) {
  const {
    monthNames = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Мая',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ],
    weekDayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    onChange = Function.prototype,
    selectedDate = new Date(),
  } = props;

  //const [selectedDate, setSelectedDate] = React.useState(selectedDate);
  const [date, setDate] = React.useState(new Date());

  const currentDate = new Date();
  const monthData = calendar.getMonthData(date.getFullYear(), date.getMonth());

  const handlePrevMonthClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };
  const handleNextMonthClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const handleDayClick = (date) => {
    //setSelectedDate(date);
    onChange(date);
  };

  return (
    <div className={classnames('ui-calendar', { top: props.position === 'top' })}>
      <div className="ui-calendar-header d-flex">
        <span
          className={classnames('ui-calendar-control', {
            disabled: date.getMonth() === currentDate.getMonth(),
          })}
          onClick={handlePrevMonthClick}>
          &lt;
        </span>
        <div className="ui-calendar-title">
          <span className="ui-calendar-month">{monthNames[date.getMonth()]} </span>
          <span className="ui-calendar-year">{date.getFullYear()}</span>
        </div>
        <span onClick={handleNextMonthClick} className="ui-calendar-control">
          &gt;
        </span>
      </div>
      <table>
        <thead>
          <tr>
            {weekDayNames.map((name) => {
              return <th key={name}>{name}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {monthData.map((week, index) => (
            <tr key={index}>
              {week.map((date, index) =>
                date ? (
                  <td
                    className={classnames(null, {
                      today: calendar.areEqual(date, currentDate),
                      active: calendar.areEqual(date, selectedDate),
                    })}
                    key={index}
                    onClick={() => handleDayClick(date)}>
                    {date.getDate()}
                  </td>
                ) : (
                  <td key={index} />
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
