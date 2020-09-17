import {
  PASS_IMGAGE_CHANGE,
  PASS_INPUTS_CHANGE,
  PASS_TYPE_CHANGE,
  PASS_RESET,
  PASS_SET_UPLOADED_IMG,
} from './actionTypes';

export function changeImage(image) {
  return {
    type: PASS_IMGAGE_CHANGE,
    image,
  };
}

export function inputsChange(formData) {
  return {
    type: PASS_INPUTS_CHANGE,
    formData,
  };
}

export function changePassType(passType) {
  return {
    type: PASS_TYPE_CHANGE,
    passType,
  };
}

export function resetPass() {
  return {
    type: PASS_RESET,
  };
}

export function setUploadedImg(img) {
  return {
    type: PASS_SET_UPLOADED_IMG,
    img,
  };
}
