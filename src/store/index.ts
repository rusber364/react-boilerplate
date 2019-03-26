import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'

import rootReducer, { IGlobalState } from './reducers'
import rootSaga from './sagas'
import { defaultState as todoDefaultState } from './todo/reducer'

const defaultState: IGlobalState = {
  count: 0,
  todo: todoDefaultState,
}

export function configureStore(preloadedState: IGlobalState = defaultState) {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [sagaMiddleware]
  const composeEnhancers = composeWithDevTools(applyMiddleware(...middlewares))

  const store: Store<IGlobalState> = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers,
  )

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      return store.replaceReducer(rootReducer)
    })
  }

  sagaMiddleware.run(rootSaga)

  return store
}

export const store: Store<IGlobalState> = configureStore()
