
import React, { PropTypes as PT, Component } from 'react'
import baseCreateElement from './createElement'
import { combineReducers } from 'redux'
import { RouterContext } from 'react-router/es6'
import { getNestedState } from './nestedState'
import { connect } from 'react-redux'

const NAMESPACE = 'reduxresolve'
const STORE_INIT = '@@reduxresolve/INIT'

const render = (props) => {
  const { store } = props
  const createElement = baseCreateElement(store)
  const contextProps = { ...props, createElement }

  return (
    <RouterContext {...contextProps}/>
  )
}

const getReducerOfRoute = (route) => route.reducer

const identityReducer = (state = {}) => state

const createShape = (self, child) => ({ self, child })

const validShape = (shape) => (shape && shape.self && shape.child) ? shape : false

const nestReducers = (routes) => (state, action) => {
  const currentState = validShape(state) || createShape()

  return routes.reduceRight((prev, routeReducer = identityReducer, depth) => {
    const { self: prevSelf } = getNestedState(currentState, depth)
    const reducer = combineReducers(createShape(routeReducer, identityReducer))
    const next = reducer(createShape(prevSelf, prev), action)

    return next
  }, null)
}

const mkReducers = ({ store, routes, reducers }, init = false) => {
  // const routes = normalizeRoutes(initalRoutes)
  const routeReducers = routes.map(getReducerOfRoute)
  const nestedReducer = nestReducers(routeReducers)
  const rootReducer = combineReducers({ ...reducers, [NAMESPACE]: nestedReducer })

  store.replaceReducer(rootReducer)
  // if (init) store.dispatch({ type: STORE_INIT, state: store.getState() })
}

const handleOnRouteChange = ({ location: prevLocation }, nextProps) => {
  const { location: nextLocation } = nextProps

  if (prevLocation.pathname !== nextLocation.pathname ||
      prevLocation.search !== nextLocation.search)
    mkReducers(nextProps)
}

// const normalizeRoutes = (routes) => routes.map((route) => {
//   if (!route.reducer) route.reducer = identityReducer
//   return route
// })

class ReduxResolve extends Component {

  static propTypes = {
    routes: PT.array.isRequired,
    location: PT.object.isRequired,
    router: PT.object.isRequired,
    store: PT.object.isRequired,
    params: PT.object.isRequired,
    reducers: PT.object.isRequired,
    // combineReducers: PT.func,
  }

  static defaultProps = {
    reducers: {}
  }

  constructor(props, ...rest) {
    super(props, ...rest)

    mkReducers(props, true)
  }

  getChildContext() {
    return { store: this.props.store }
  }

  componentWillReceiveProps(nextProps) {
    handleOnRouteChange(this.props, nextProps)
  }

  render() {
    return render(this.props)
  }

}

ReduxResolve.childContextTypes = {
  store: PT.object.isRequired
}

export default connect(identityReducer)(ReduxResolve)