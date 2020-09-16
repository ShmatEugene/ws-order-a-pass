import React from 'react';
import ApplicationsList from './components/ApplicationsList/ApplicationsList';
import ApplyForAPass from './components/ApplyForAPass/ApplyForAPass';
import Header from './components/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Auth from './components/Auth/Auth';
import Logout from './components/Logout';
import { autoLogin } from './store/actions/auth';

function App() {
  const state = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const isAuthenticated = !!state.token;

  React.useEffect(() => {
    dispatch(autoLogin());
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={ApplyForAPass} />
      <Route path="/auth" exact component={Auth} />
      <Route path="/applications-list/:id" exact component={ApplicationsList} />
      <Redirect to={'/'} />
    </Switch>
  );
  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/applications-list" exact component={ApplicationsList} />
        <Route path="/applications-list/:id" exact component={ApplicationsList} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/" exact component={ApplyForAPass} />
        <Redirect to={'/'} />
      </Switch>
    );
  }
  return (
    <div className="wrap">
      <div className="content">
        <Header />
        {routes}
      </div>
    </div>
  );
}

export default App;
