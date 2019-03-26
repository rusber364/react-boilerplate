import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { asyncGetTodo } from 'store/todo/actions'
import { IStateModule } from 'store/todo/types'
import { IGlobalState } from 'store/reducers'

interface IStateToProps {
  todo: IStateModule
  loaded: boolean
}

interface IDispatchToProps {
  getData(num?: string): void
}

type IProps = IStateToProps & IDispatchToProps

const App: React.FC<IProps> = ({ todo, getData }) => {
  const [num, setNum] = useState('')

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setNum(target.value)
  }

  const handlerGetData = (num: string) => () => {
    getData(num)
  }

  return (
    <>
      <div>
        <input value={num} onChange={handleChange} />
        <button onClick={handlerGetData(num)}>OK</button>
      </div>
      {todo.data && (
        <>
          <div>ID: {todo.data.id}</div>
          <h3>{todo.data.title}</h3>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state: IGlobalState): IStateToProps => ({
  todo: state.todo,
  loaded: state.todo.loaded,
})

const mapDispatchToProps = (dispatch: Dispatch): IDispatchToProps => ({
  getData: (num) => dispatch(asyncGetTodo.started({ todoNum: num })),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
