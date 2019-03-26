import { combineReducers, Reducer } from 'redux'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { IStateModule } from './todo/types'
import todoReducer from './todo/reducer'

export interface IGlobalState {
  count: number
  todo: IStateModule
}

const rootReducer: Reducer<IGlobalState> = combineReducers<IGlobalState>({
  count: reducerWithInitialState(0),
  todo: todoReducer,
})

export default rootReducer
