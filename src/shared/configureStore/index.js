import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import gameModel from '../../Application/model'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

export default (reducers = {}) => (initalState = gameModel) => {
  const rootReducer = combineReducers(reducers)
  const middleware = [promiseMiddleware(), thunk]

  return compose(
    applyMiddleware(...middleware),
    typeof window === 'object' ? window.devToolsExtension ? window.devToolsExtension() : (f) => f : (f) => f
  )(createStore)(rootReducer, initalState)
}
