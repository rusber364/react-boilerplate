export interface IData {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface IStateModule {
  loading: boolean
  loaded: boolean
  data?: IData
}

export interface IPayload {
  todoNum?: string
}
