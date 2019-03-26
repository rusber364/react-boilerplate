import React from 'react'
import ReactDOM from 'react-dom'
import css from './test.module.styl'
import Test from 'components/Test/Test'

ReactDOM.render(
  <div className={css.red}>
    <Test />
  </div>,
  document.getElementById('test'),
)
