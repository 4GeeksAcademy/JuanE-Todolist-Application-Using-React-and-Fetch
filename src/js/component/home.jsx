import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  function fetchForTask() {
    fetch('https://playground.4geeks.com/todo/users/juane')
      .then((response => response.json()))
      .then((data) => setTasks(data.todos))
  }

  useEffect(() => {
    fetchForTask();
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const taskToAdd = { label: newTask };
      setNewTask('');

      fetch('https://playground.4geeks.com/todo/todos/juane', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskToAdd),
      })
        .then(response => response.json())
        .then(data => {console.log('Task added:', data);
        fetchForTask(); 
        })
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (i !== index) {
        updatedTasks.push(tasks[i]);
      }
    }
    setTasks(updatedTasks);

    fetch(`https://playground.4geeks.com/todo/todos/${tasks[index].id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((result) => console.log(result))
      fetchForTask();
  };

  const removeAllTasks = () => {
    const deletePromises = tasks.map(task => {
      return fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
        method: 'DELETE',
      })
      .then(response => response.text())
      .then(result => console.log(result))
    });
    Promise.all(deletePromises)
      .then(() => {
        setTasks([]); 
        fetchForTask(); 
      })
  };
  
  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };


  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }
  return (
    <>
      <div className="container">
        <h1>Todolist with React and Fetch</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          className="form-control"
          value={newTask}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
        />
        <ul className="list-group ">
          {tasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {task.label}
              <button className='delete-button' onClick={(onClick) => removeTask(index)}>x</button>
            </li>
          ))}
          <li id='footer' className="list-group-item"></li>
        </ul>
      </div>
      <div className="element">
        <p>{tasks.length} item(s) left</p>
        <button className="btn btn-danger" onClick={removeAllTasks}>Remove All Tasks</button>
      </div>
    </>
  );
}

export default TodoList;
