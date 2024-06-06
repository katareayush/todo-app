
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'
import { useState } from 'react';

function  App() {
  const [todos, setTodos] = useState([]);

  fetch('http://localhost:3000/todos').then(async function(res){
    const json = await res.json();
    setTodos(json.Todos);
 })

  
  return (
    
    <div>
        <CreateTodo />
        <Todos todos={todos}/>
    </div>
  )
}

export default App