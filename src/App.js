import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import TaskForm from './components/TaskForm'; 
import TaskList from './components/TaskList';
import LoginForm from './components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Funzione per recuperare i task
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Errore nel recuperare i task:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTasks();
        }
    }, [token, fetchTasks]); // Aggiunto fetchTasks alle dipendenze per evitare warning

    const handleLogin = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div className="container mt-4" style={{ backgroundColor: '#90ee90', color: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header className="mb-4 text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="Logo" className="img-fluid" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
                <h1>Focusly</h1>
            </header>
            <h2 style={{ fontStyle: 'italic', textAlign: 'center', fontSize: '1.2rem' }}>
                Rendi la tua giornata più semplice. Un task alla volta!
            </h2>
            <div className="flex-grow-1">
                {token ? (
                    <div>
                        <TaskForm fetchTasks={fetchTasks} />
                        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
                        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                    </div>
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </div>
            <footer className="text-center mt-4" style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                <p>Tutti i diritti riservati © 2024</p>
            </footer>
        </div>
    );
};

export default App;

