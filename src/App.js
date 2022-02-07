import React, { useEffect, useState } from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")

//Tämä muuttaa jsonin takaisin js:ksi ja jos on tallennettu json niin asettaa ne tehtäviks
  React.useEffect(() => {
    const json = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(json)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])
  
// Seuraava tallentaa käyttäjän antaman vastauksen -> jos refressaa sivun nii ei katoa
  React.useEffect(() => {
    const json = JSON.stringify(todos)
    localStorage.setItem("todos", json)
  }, [todos])

//Uuden tehtävän käsittely TOIMII
  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }

    if (newTodo.text.length === 0) {
      return
    } else {
    setTodos([...todos].concat(newTodo))
    setTodo("")
    }
  }

//Tehtävän poistaminen TOIMII
  function deleteTodo(id) {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

//Tehtävien järjesteminen aakkosjärjestykseen, huomioi myös isot kirjaimet TOIMII
function sort() {
  const sorted = [...todos].sort(function(a, b){
    if(a.text.toUpperCase() < b.text.toUpperCase()) { return -1; }
    if(a.text.toUpperCase() > b.text.toUpperCase()) { return 1; }
    return 0;
})
  setTodos(sorted)
}

//Kaikkien tehtävien poistaminen TOIMII
  function clearTodos() {
    const clearedTodos = []
    setTodos(clearedTodos)
  }

//Merkitsee tehtävän tehdyksi TOIMII
  function checkbox(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <h1>Todo-lista</h1>
      <div className='form'>
      <form onSubmit={handleSubmit}>
        <input type = "text" onChange={(e) => setTodo(e.target.value)} value={todo}
          placeholder='Lisää uusi tehtävä...'
        />
        <button type = "submit">+</button>
      </form>
      </div>
      <div className="list">
      {todos.map((todo) => <div className = "li" key={todo.id}>
        {todo.text}
        <input id="checkbox" type="checkbox" onChange={() => checkbox(todo.id)} 
        checked={todo.completed}/>
        <button onClick={() => deleteTodo(todo.id)}>X</button>
      </div>)}
      <button onClick={() => sort()}>Lajittele A-Ö</button>
      <button onClick={() => clearTodos()}>Poista kaikki</button>
    </div>
    </div>
  );
}

export default App;