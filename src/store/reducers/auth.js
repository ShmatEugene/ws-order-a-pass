const initialState = {
  token: null,
  login: null,
};

export default function authReduer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return { ...state, token: action.token, login: action.login };
    case 'AUTH_LOGOUT':
      return { ...state, token: null, login: null };

    default:
      return state;
  }
}
