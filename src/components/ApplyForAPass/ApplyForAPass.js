import React from 'react';
import Input from '../UI/Input';
import is from 'is_js';
import RadioButton from '../UI/RadioButton';
import Button from '../UI/Button';
import axios from 'axios';

const defaultControl = {
  value: '',
  errorMessage: [],
  touched: false,
  valid: false,
  shouldValidate: true,
  type: 'text',
};

function createFormControls() {
  return {
    name: {
      ...defaultControl,
      type: 'name',
      label: 'ФИО',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        cyrillic: { active: true, errorMessage: 'Имя должно содержать только кириллицу' },
      },
    },
    email: {
      ...defaultControl,
      label: 'Email',
      type: 'email',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
        email: { active: true, errorMessage: 'Некорректно введен E-mail' },
      },
    },
    startDate: {
      ...defaultControl,
      label: 'Начало действия',
      for: 1,
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    endDate: {
      ...defaultControl,
      label: 'Окочание действия',
      for: 1,
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    purpose: {
      ...defaultControl,
      label: 'Цель посещения',
      for: 1,
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
  };
}

function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export default function ApplyForAPass() {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [checkedRadioButton, setCheckedRadioButton] = React.useState(0);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [loading, setLoading] = React.useState(false);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      key: makeId(7),
      status: 'pending',
      type: checkedRadioButton,
      date: new Date(),
    };
    Object.keys(formControls).forEach((name) => {
      if (formControls[name].for === checkedRadioButton || formControls[name].for === undefined) {
        formData[name] = formControls[name].value;
      }
    });
    setLoading(true);
    axios
      .post('https://ws-order-a-pass.firebaseio.com/orders.json', formData)
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    setFormControls(createFormControls());
    console.log(formData);
  };

  function validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    let error = [];

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }
    if (validation.email) {
      isValid = is.email(value) && isValid;
      if (!is.email(value) && value.trim() !== '') error.push(validation.email.errorMessage);
    }
    if (validation.cyrillic) {
      isValid = !value.match(/[^а-я\sё]/i) && isValid;
      if (!!value.match(/[^а-я\sё]/i) && value.trim() !== '')
        error.push(validation.cyrillic.errorMessage);
    }

    return { isValid, error };
  }

  const onRadioButtonSelectHandler = (id) => {
    setCheckedRadioButton(id);
    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid =
        (formControls[name].valid ||
          (formControls[name].for !== id && formControls[name].for !== undefined)) &&
        isFormValid;
    });
    setIsFormValid(isFormValid);
  };

  const onInputChangeHandler = (event, controlName) => {
    const form = { ...formControls };
    const control = { ...form[controlName] };

    control.value = event.target.value;
    control.touched = true;
    const validation = validateControl(control.value, control.validation);
    control.valid = validation.isValid;
    control.errorMessage = validation.error;
    form[controlName] = control;

    let isFormValid = true;
    Object.keys(form).forEach((name) => {
      isFormValid =
        (form[name].valid ||
          (form[name].for !== checkedRadioButton && form[name].for !== undefined)) &&
        isFormValid;
    });

    setIsFormValid(isFormValid);
    setFormControls(form);
  };

  function renderInputs(id) {
    const inputs = Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      if (control.for === id) {
        return (
          <Input
            key={controlName + index}
            label={control.label}
            value={control.value}
            type={control.type}
            errorMessage={control.errorMessage}
            valid={control.valid}
            touched={control.touched}
            validation={control.validation}
            shouldValidate={control.shouldValidate}
            onChange={(event) => onInputChangeHandler(event, controlName)}
          />
        );
      } else {
        return null;
      }
    });

    return inputs;
  }

  return (
    <section className="apply-for-a-pass section-indent">
      <h2>Подать заявку</h2>
      <form action="#">
        {renderInputs()}
        <RadioButton
          options={[
            {
              label: 'Постоянный',
              id: 0,
            },
            { label: 'Временный', id: 1 },
          ]}
          title="Тип пропуска"
          onSelect={(event) => onRadioButtonSelectHandler(event)}
          checkedRadioButton={checkedRadioButton}
        />
        {renderInputs(checkedRadioButton)}

        <Button onClick={formSubmitHandler} disabled={!isFormValid}>
          {loading ? '...' : 'Отправить'}
        </Button>
      </form>
    </section>
  );
}
