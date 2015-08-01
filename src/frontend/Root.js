import React, { PropTypes } from 'react';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import * as components from './components';
import * as reducers from './reducers';

const {
  Application
} = components;

const reducer = combineReducers(reducers);
const finalCreateStore = applyMiddleware(thunk)(createStore);
const store = finalCreateStore(reducer);

export default class Root extends React.Component {
  static PropTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history } = this.props;
    return (
      <Provider store={ store }>
        { renderRoutes.bind(null, history) }
      </Provider>
    );
  }
}

function renderRoutes(history) {
  return (
    <Router history={ history }>
      <Route path='/' component={ Application } />
    </Router>
  );
}