import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ fetchTasks }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Assicurati che l'URL punti al backend
            await axios.post('http://localhost:3000/tasks', { name, completed: false }); 
            setName(''); // Resetta il campo input
            fetchTasks(); // Ricarica i task dopo aver aggiunto un nuovo task
        } catch (error) {
            console.error('Errore nella creazione del task:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome del task"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <button type="submit">Aggiungi Task</button>
        </form>
    );
};

export default TaskForm;
