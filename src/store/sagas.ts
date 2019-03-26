import { SagaIterator } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import sagaData from './todo/saga'

export default function* rootSaga(): SagaIterator {
  yield fork(sagaData)
}
