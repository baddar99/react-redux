import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedLogin } from './Login';

const RouteGuard =
  Component =>
  ({ match }) => {
    console.info('Route Guard ', match);
    if (!store.getState().session.authenticated) {
      //reroute
      return <Redirect to='/' />;
    }
    return <Component match={match} />;
  };

export const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route path='/' component={ConnectedLogin} exact />
          <Route
            path='/dashboard'
            render={RouteGuard(ConnectedDashboard)}
            exact
          />
          <Route
            path='/task/:id'
            render={RouteGuard(ConnectedTaskDetail)}
            exact
          />
        </div>
      </Provider>
    </Router>
  );
};
