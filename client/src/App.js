// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/tasks';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        axios.get(API_URL).then((response) => {
            setTasks(response.data);
        });
    }, []);

    const addTask = async () => {
        if (newTask.trim()) {
            const response = await axios.post(API_URL, { title: newTask });
            setTasks([...tasks, response.data]);
            setNewTask("");
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className="task-list">
                {tasks.map(task => (
                    <div key={task._id} className="task">
                        <span>{task.title}</span>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
