import axios, { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, takeLatest, delay } from 'redux-saga/effects'
import { bindAsyncAction } from 'typescript-fsa-redux-saga'
import { asyncGetTodo } from './actions'
import { IData } from './types'

function* worker({ todoNum = '1' }): SagaIterator {
  yield delay(1000)

  if (todoNum === '') {
    todoNum = '1'
  }

  const url = `https://jsonplaceholder.typicode.com/todos/${todoNum}`
  const { data }: AxiosResponse<IData> = yield call(axios, url)

  return data
}
const getDataWorker = bindAsyncAction(asyncGetTodo, {
  skipStartedAction: true,
})(worker)

export default function* getDataWatcher(): SagaIterator {
  yield takeLatest(asyncGetTodo.started, function*(action) {
    try {
      if (asyncGetTodo.started.match(action)) {
        yield call(getDataWorker, action.payload)
      }
    } catch (error) {
      yield error
    }
  })
}
