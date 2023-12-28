import React, { useState } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskValue, setEditedTaskValue] = useState("");

  function addTask() {
    if (!newTask) {
      alert("Enter an Item.");
      return;
    }

    const task = {
      id: Math.floor(Math.random() * 1000),
      value: newTask,
    };

    setTasks((oldList) => [...oldList, task]);
    setNewTask("");
  }

  function deleteTask(id) {
    const newArray = tasks.filter((task) => task.id !== id);
    setTasks(newArray);
  }

  function startEditingTask(id, value) {
    setEditingTaskId(id);
    setEditedTaskValue(value);
  }

  function saveEditedTask() {
    setTasks((oldTasks) =>
      oldTasks.map((task) =>
        task.id === editingTaskId ? { ...task, value: editedTaskValue } : task
      )
    );
    setEditingTaskId(null);
  }

  return (
    <div className="App">
      <h1>My To-Do List </h1>

      <input
        type="text"
        placeholder="Enter tasks"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={addTask}> Add </button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTaskValue}
                  onChange={(e) => setEditedTaskValue(e.target.value)}
                />
                <button onClick={saveEditedTask}>Save</button>
              </>
            ) : (
              <>
                {task.value}
                <button onClick={() => startEditingTask(task.id, task.value)}>
                  Update task
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete task</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
