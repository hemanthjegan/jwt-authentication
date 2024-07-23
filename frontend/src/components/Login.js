import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../api';

const Login = ({ setToken, setApiKey , setUserId}) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login(credentials);
            setToken(data.token);
            setApiKey(data.api_key);
            setUserId(data.user_id);
            toast.success('Login successful');
            console.log(data)
            // if (data.api_key) {
            //     navigate('/public/profile');
            // } else {
            //     navigate('/candidates');
            // }
        } catch (error) {
            // toast.error('Error logging in');
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
