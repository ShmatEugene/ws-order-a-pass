import React from 'react';
import Input from '../UI/Input';
import is from 'is_js';
import RadioButton from '../UI/RadioButton';
import Button from '../UI/Button';
import axios from 'axios';
import ImageUploader from '../ImageUploader';

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
      type: 'date',
      validation: {
        required: { active: true, errorMessage: 'Обязатльное поле' },
      },
    },
    endDate: {
      ...defaultControl,
      label: 'Окочание действия',
      for: 1,
      type: 'date',
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
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  for (let i = 0; i < length - 2; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 2; i++) {
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return result;
}

export default function ApplyForAPass() {
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [checkedRadioButton, setCheckedRadioButton] = React.useState(0);
  const [formControls, setFormControls] = React.useState(createFormControls());
  const [loading, setLoading] = React.useState(false);
  const [orderLink, setOrderLink] = React.useState(false);
  const [selectedImg, setSelectedImg] = React.useState(null);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      key: makeId(7),
      status: 'pending',
      type: checkedRadioButton,
      date: new Date(),
      image: selectedImg,
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
        setOrderLink(formData.key);
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

  const onInputClickHandler = () => {
    console.log('clicked');
  };

  const uploadImageHandler = (image) => {
    setSelectedImg(image);
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
            onClick={onInputClickHandler}
          />
        );
      } else {
        return null;
      }
    });

    return inputs;
  }

  const onSelectFile = (event) => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append('myFile', event.target.files[0], event.target.files[0].name);
    setSelectedImg(formData);
  };

  return (
    <section className="apply-for-a-pass section-indent">
      <h2>Подать заявку</h2>
      <form action="#">
        <div className="left">
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
          {orderLink && `${window.location.href}/applications-list/${orderLink}`}
        </div>
        <div className="right">
          {/* <ImageUploader onUpload={uploadImageHandler} /> */}
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
      </form>
    </section>
  );
}
