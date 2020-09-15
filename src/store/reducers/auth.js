const initialState = {
  token: null,
};

export default function authReduer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return { ...state, token: action.token };

    default:
      return state;
  }
}
