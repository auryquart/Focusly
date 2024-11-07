import React from 'react';
import axios from 'axios';

const TaskList = ({ tasks, fetchTasks }) => {
    const handleToggleComplete = async (taskId) => {
        try {
            await axios.patch(`http://localhost:3000/tasks/${taskId}`, { completed: true });
            fetchTasks(); // Ricarica i task dopo l'aggiornamento
        } catch (error) {
            console.error('Errore nell\'aggiornare il task:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            fetchTasks(); // Ricarica i task dopo l'eliminazione
        } catch (error) {
            console.error('Errore nell\'eliminare il task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span onClick={() => handleToggleComplete(task._id)} style={{ cursor: 'pointer' }}>
                            {task.name} {task.completed ? '(Completato)' : ''}
                        </span>
                        <button onClick={() => handleDeleteTask(task._id)}>Elimina</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
