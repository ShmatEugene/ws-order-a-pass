import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../UI/Input';
import is from 'is_js';
import RadioButton from '../UI/RadioButton';
import Button from '../UI/Button';
import axios from 'axios';
import { storage } from '../../firebase';
import ImageUploader from '../ImageUploader';
import Guest from '../PassTemplates/Guest';
import { changePassType, inputsChange, resetPass } from '../../store/actions/pass';
import Employee from '../PassTemplates/Employee';

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
  const dispatch = useDispatch();
  const state = useSelector(({ pass }) => pass);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      key: makeId(7),
      status: 'pending',
      type: checkedRadioButton,
      date: new Date(),
      imageLink: '',
    };
    Object.keys(formControls).forEach((name) => {
      if (formControls[name].for === checkedRadioButton || formControls[name].for === undefined) {
        formData[name] = formControls[name].value;
      }
    });
    setLoading(true);

    console.log(selectedImg);
    const imageName = makeId(20);
    const uploadTask = storage.ref(`images/${imageName}.jpg`).put(selectedImg);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref('images')
          .child(`${imageName}.jpg`)
          .getDownloadURL()
          .then((url) => {
            formData.imageLink = url;
            axios
              .post(`https://ws-order-a-pass.firebaseio.com/orders.json/`, formData)
              .then((response) => {
                console.log(response);
                setOrderLink(formData.key);
                setLoading(false);
                dispatch(resetPass());
              });
          });
      },
    );

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
    dispatch(changePassType(id));
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

    dispatch(inputsChange(form));
    setIsFormValid(isFormValid);
    setFormControls(form);
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
          <br />
          {orderLink && (
            <span className={`status pending order-link`}>
              {`${window.location.href}applications-list/${orderLink}`}
            </span>
          )}
        </div>
        <div className="right">
          <ImageUploader onUpload={uploadImageHandler} />
        </div>
        <div className="pass">
          {state.type === 1 ? (
            <Guest
              name={state.formData && state.formData.name.value}
              imgSrc={state.formData && state.img}
              startDate={state.formData && state.formData.startDate.value}
              endDate={state.formData && state.formData.endDate.value}
            />
          ) : (
            <Employee
              name={state.formData && state.formData.name.value}
              imgSrc={state.formData && state.img}
            />
          )}
        </div>
      </form>
    </section>
  );
}
