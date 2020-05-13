import React, { useEffect, memo, useState, useCallback, useRef } from 'react'
import './TodoList.scss';
let idSeq = Date.now();
const Control = memo(function (props) {
  const { addTodo } = props
  const handleOnSubmit = (e) => {
    const newText = inputRef.current.value.trim();
    if (newText.length === 0) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    })
    inputRef.current.value = '';
    e.preventDefault();
  }
  const inputRef = useRef();
  return <div className='control'>
    <h1>todos</h1>
    {/* 表单敲击回车就可以提交 */}
    <form onSubmit={handleOnSubmit}>
      <input ref={inputRef} type="text" className='new-todo' placeholder='新增一条数据' />
    </form>
  </div>
}
)
const TodoItem = memo(function (props) {
  const { todos: { id, text, complete }, toggleTodo, removeTodo } = props
  const onchange = () => {
    toggleTodo(id)
  }
  const onRemove = () => {
    removeTodo(id)
  }
  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onchange}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{text}</label>
      <button onClick={onRemove}>×</button>
    </li>
  )
}
)
const Todos = memo(function (props) {
  const { todos, toggleTodo, removeTodo } = props
  return <>
    <ul>
      {/* 
    根据react基础知识
      应该把数据放到一个单独的组件当中渲染出来，这样不至于
      个别成员数据的变化，导致全部成员都需要渲染
      也就是，每次操作的是单个的组件
      原先：增加删除一条数据，需要的是重新渲染整个列表
      现在：数据直接保存到单个的组件当中，删除和移除的是单个组件
    */}
      {
        todos.map(v => {
          return <TodoItem
            key={v.id}
            todos={v}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo} />
        })
      }
    </ul>
  </>
}
)
const LS_KEY = 'LS_KEY';
export default function TodoList () {
  const [todos, setTodos] = useState([]);
  /**
   * 增
   */
  const addTodo = useCallback(
    (todo) => {
      setTodos(todos => [...todos, todo])
    },
    [],
  )
  /**
   * 删,传递给子组件的方法，需要callback
   */
  const removeTodo = useCallback((id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
    let localTodo = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
    let newTodo = localTodo.filter(todo => todo.id !== id);
    localStorage.setItem(LS_KEY, newTodo)
    if (newTodo.length === 0) {
      localStorage.removeItem(LS_KEY)
    }
  }, []
  )
  /**
   * 改状态,如果不使用useCallback优化句柄，不用考虑依赖，用了的话，需要考虑依赖，这里使用函数形式setState，所以不用依赖
   */
  const toggleTodo = useCallback(
    (id) => {
      setTodos(todos => todos.map(todo => {
        return todo.id === id ?
          {
            ...todo,
            complete: !todo.complete
          }
          : todo
      })
      )
    },
    [],
  )
  /**
   * useEffect的执行顺序，先写的话，导致第二次先把自身的空数组写
   * 到内存当中，导致最后读的时候是空值
   */
  // 从磁盘当中读取todo
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
    setTodos(todos);
  }, [])
  // 写todo的数组到磁盘上面
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos))
  }, [todos])
  return (
    <div className='todo-list'>
      <Control addTodo={addTodo}></Control>
      <Todos
        removeTodo={removeTodo}
        todos={todos}
        toggleTodo={toggleTodo}></Todos>
    </div>
  )
}
