import React, { Component } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      login: {
        value: '',
        errorMessage: [],
        touched: false,
        valid: false,
        shouldValidate: true,
        type: 'text',
        label: 'Логин',
        validation: {
          required: { active: true, errorMessage: 'Обязатльное поле' },
        },
      },
      password: {
        value: '',
        errorMessage: [],
        touched: false,
        valid: false,
        shouldValidate: true,
        type: 'password',
        label: 'Пароль',
        validation: {
          required: { active: true, errorMessage: 'Обязатльное поле' },
        },
      },
    },
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let error = [];

    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
      if (!(value.trim() !== '')) error.push(validation.required.errorMessage);
    }
    return { isValid, error };
  }

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    const validation = this.validateControl(control.value, control.validation);
    control.valid = validation.isValid;
    control.errorMessage = validation.error;
    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
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
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
  }

  loginHandler = async () => {
    this.props.auth(
      this.state.formControls.login.value + '@mail.ru',
      this.state.formControls.password.value,
      false,
    );
    // const authData = {
    //   email: this.state.formControls.login.value + '@mail.ru',
    //   password: this.state.formControls.password.value,
    //   returnSecureToken: true,
    // };
    // try {
    //   const response = await axios.post(
    //     'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfrKvNVXLlJ_opm8LU266FIYxkmhlsT5I',
    //     authData,
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  //   registerHandler = async () => {
  //     const authData = {
  //       email: this.state.formControls.login.value,
  //       password: this.state.formControls.password.value,
  //       returnSecureToken: true,
  //     };
  //     try {
  //       const response = await axios.post(
  //         'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfrKvNVXLlJ_opm8LU266FIYxkmhlsT5I',
  //         authData,
  //       );
  //       console.log(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  render() {
    return (
      <div className="auth">
        <h2>Авторизация</h2>
        <form action="#">
          {this.renderInputs()}
          <Button onClick={this.loginHandler}>Войти</Button>
          {/* <Button onClick={this.registerHandler}>Зарегистрироваться</Button> */}
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, islogin) => dispatch(auth(email, password, islogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
