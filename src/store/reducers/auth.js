const initialState = {
  token: null,
  login: null,
  isOperator: false,
  isAdmin: false,
};

export default function authReduer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: action.token,
        login: action.login,
        isOperator: action.isOperator,
        isAdmin: action.isAdmin,
      };
    case 'AUTH_LOGOUT':
      return { ...state, token: null, login: null };

    default:
      return state;
  }
}
