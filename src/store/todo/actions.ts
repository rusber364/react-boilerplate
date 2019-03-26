import { actionCreatorFactory } from 'typescript-fsa'
import { IData, IPayload } from './types'

const ACF = actionCreatorFactory('@@todo')

export const getTodo = ACF<IPayload>('GET_DATA') // sync
export const asyncGetTodo = ACF.async<IPayload, IData>('ASYNC_GET_DATA') //async
