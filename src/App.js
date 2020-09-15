import React from 'react';
import ApplicationsList from './components/ApplicationsList/ApplicationsList';
import ApplyForAPass from './components/ApplyForAPass/ApplyForAPass';
import Header from './components/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import Auth from './components/Auth/Auth';

function App() {
  let routes = (
    <Switch>
      <Route path="/" exact component={ApplyForAPass} />
      <Route path="/applications-list" exact component={ApplicationsList} />
      <Route path="/auth" exact component={Auth} />
      <Redirect to={'/'} />
    </Switch>
  );
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
