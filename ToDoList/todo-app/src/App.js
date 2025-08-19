import React, { useState, useEffect } from 'react';
import { AiOutlineDelete} from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";

import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = { title: newTitle, description: newDescription, completed: false };
    let updatedTodos = [...allTodos];
    updatedTodos.push(newTodoItem);
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  const handleDeleteTodo = (index) => {

    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
  };

  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice (index, 1);
    setCompletedTodos (reducedTodo);
    localStorage.setItem ('completedTodos', JSON.stringify (reducedTodo));
  };

  const handleCompletedTodo = index => {
    let now = new Date ();
    let dd = now.getDate ();
    let mm = now.getMonth () + 1;
    let yyyy = now.getFullYear ();
    let h = now.getHours ();
    let m = now.getMinutes ();
    let s = now.getSeconds ();
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push (filteredItem);
    setCompletedTodos (updatedCompletedArr);
    handleDeleteTodo (index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
  };

  useEffect(() => {
    let savedTodo = JSON.parse (localStorage.getItem ('todolist'));
    let savedCompletedTodo = JSON.parse (
      localStorage.getItem ('completedTodos')
    );
    if (savedTodo) {
      setTodos (savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos (savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My ToDo List</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter your task here" />
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter task description here" />
          </div>
          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
          </div>
        </div>
        <div className='btn-area'>
            <button className={`secondaryBtn ${isCompleteScreen ? '' : 'active'}`} onClick={() => setIsCompleteScreen(false)}>Todo</button>
            <button className={`secondaryBtn ${isCompleteScreen ? 'active' : ''}`} onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className='todo-list'>
          {isCompleteScreen && completedTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <div className='todo-content'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p className='completed-on'>Completed on: {item.completedOn}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} />
              </div>
            </div>
          ))}
          {!isCompleteScreen && allTodos.map((item, index) => (
            <div className='todo-list-item' key={index}>
              <div className='todo-content'>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <AiOutlineDelete className='icon' onClick={() => handleDeleteTodo(index)} />
                <BsCheckLg className='check-icon' onClick={() => handleCompletedTodo(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
