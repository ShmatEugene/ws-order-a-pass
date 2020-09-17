const initialState = {
  img: null,
  formData: null,
  type: 0,
  uploadedImg: null,
};

export default function passReduer(state = initialState, action) {
  switch (action.type) {
    case 'PASS_IMGAGE_CHANGE':
      return { ...state, img: action.image };
    case 'PASS_INPUTS_CHANGE':
      return { ...state, formData: action.formData };
    case 'PASS_TYPE_CHANGE':
      return { ...state, type: action.passType };
    case 'PASS_RESET':
      return { ...state, type: 0, formData: null, img: null, uploadedImg: null };
    case 'PASS_SET_UPLOADED_IMG':
      return { ...state, uploadedImg: action.img };

    default:
      return state;
  }
}
