import React from 'react'
import styled from 'react-emotion'
import Todo from './Todo'

const TodoList = ({todos}) => {
  return (
    <Wrapper>
      {
        todos.map((todo, i) => (
          <Todo {...todo} index={i} key={todo.id} />
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export default TodoList
