import React from 'react';
import ApplicationsList from './components/ApplicationsList/ApplicationsList';
import ApplyForAPass from './components/ApplyForAPass/ApplyForAPass';
import Header from './components/Header';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  let routes = (
    <Switch>
      <Route path="/apply" component={ApplyForAPass} />
      <Route path="/" exact component={ApplicationsList} />
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
