
import { Router, browserHistory } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import React from 'react'
import configureStore from 'configureStore'

import { route as routes } from '../Application'
import reducers from 'modules'

if (__DEV__)
  // Export React and Performance Utility for debugging
  window.React = React

const store = configureStore(reducers)(window.__INITIAL_STATE__)
const rootEl = document.getElementById('app')

const main = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
      </Provider>
    </AppContainer>,
    rootEl
  )
}

if (module.hot) module.hot.accept(main)

main()
