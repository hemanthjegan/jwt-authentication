import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Candidates from './components/Candidates';
import Protected from './components/Protected';
import Profile from './components/Profile'
import PublicCandidate from './components/PublicCandidate'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
    const [token, setToken] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [userId, setUserId] = useState('');

    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setToken={setToken} setApiKey={setApiKey} setUserId={setUserId}/>} />
                    <Route 
                        path="/candidates" 
                        element={<Candidates token={token} />} 
                    />
                    <Route 
                        path="/protected" 
                        element={token ? <Protected /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/public/profile" 
                        element={token ? <Profile token={token} apiKey={apiKey} userId={userId}/> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/public/candidate" 
                        element={token ? <PublicCandidate token={token} apiKey={apiKey} userId={userId}/> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <h1>JWT Authentication System</h1>
                                <nav>
                                    <ul>
                                        <li><a href="/register">Register</a></li>
                                        <li><a href="/login">Login</a></li>
                                        <li><a href="/protected">Protected</a></li>
                                        <li><a href="/public/profile">Profile</a></li>
                                    </ul>
                                </nav>
                            </div>
                        }
                    />
                </Routes>
                <ToastContainer />
            </div>
        </Router>
    );
};

export default App;
