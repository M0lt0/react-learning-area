
import { useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'
import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const inputRef = useRef()

  const handelAdd = () => {
    const text = inputRef.current.value
    const newItem = { id: uuidv4(), completed: false, text }
    setTodos([...todos, newItem])
    inputRef.current.value = ''
  }
  const handeleDone = (id) => {
    const newTodos = [...todos]
    newTodos[id].completed = !newTodos[id].completed
    setTodos(newTodos)
  }
  const handeleDelete = (id) => {
    const newTodos = [...todos]
    newTodos.splice(id, 1)
    setTodos(newTodos)
  }
  return (
    <div className="App">
      <h2>my to do</h2>
      <div className='container'>
        <ul>
          {todos.map(({ text, completed }, id) => {
            return (
              <div className='item' key={id}>

                <li className={completed ? 'done' : ''}
                  onClick={() => handeleDone(id)}
                >
                  {text}
                </li>
                <span className='delete' onClick={() => handeleDelete(id)}>X</span>
              </div>
            )
          })}
        </ul >
      </div>
      <input ref={inputRef} type="text" placeholder='enter item' />
      <button onClick={handelAdd}>Add</button>
    </div >
  );
}


export default App;
