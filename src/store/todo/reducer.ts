import { reducerWithInitialState } from 'typescript-fsa-reducers'

import { asyncGetTodo } from './actions'
import { IStateModule } from './types'

export const defaultState: IStateModule = {
  loading: false,
  loaded: false,
  data: undefined,
}

export default reducerWithInitialState<IStateModule>(defaultState)
  .case(asyncGetTodo.started, (state) => ({
    ...state,
    loading: true,
  }))
  .case(asyncGetTodo.done, (state, { result }) => ({
    ...state,
    loaded: true,
    loading: false,
    data: result,
  }))
  .case(asyncGetTodo.failed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
