import React, { useReducer, useEffect } from 'react';
import 'normalize.css'
import './App.css';
import CreateBox from './components/CreateBox'
import TodoList from './components/TodoList'
import shortid from 'shortid'
import ls from 'local-storage'
import styled from 'react-emotion'

export const TodosContext = React.createContext([])

const setTodoKeyByIndex = ({todos, key, value, index}) => ([
  ...todos.slice(0, index),
  {...todos[index], [key]: value},
  ...todos.slice(index + 1)
])

const App = () => {
  const [todos, dispatch] = useReducer(
    (todos, action) => {
      switch (action.type) {
        case 'ADD_TODO':
          return [{done: false, text: action.todo, id: shortid.generate()}, ...todos]
        case 'SET_DONE':
          return setTodoKeyByIndex({todos, key: 'done', value: action.done, index: action.index })
                .sort((a,b) => {
                  if(a.done) return 1;
                  if(b.done) return -1;
                  return 0;
                })
        case 'SET_TEXT':
          return setTodoKeyByIndex({todos, key: 'text', value: action.text, index: action.index})
        case 'DELETE_TODO':
          return [
            ...todos.slice(0, action.index),
            ...todos.slice(action.index + 1)
          ]
        default:
          return todos;
      }
    }, ls.get("TODOS") || []
  )
  useEffect(() => {
    ls.set("TODOS", todos)
  }, [todos])

  const handleSubmit = todo => {
    dispatch({
      type: 'ADD_TODO',
      todo
    })
  }

  return (
    <div className="App">
      <TodosContext.Provider value={{todos, dispatch}}>
        <Title>React Hooks Todo</Title>
        <CreateBox onSubmit={handleSubmit}/>
        <TodoList todos={todos}/>
      </TodosContext.Provider>
    </div>
  );
}

const Title = styled('h1')({
  textAlign: 'center'
})

export default App;
