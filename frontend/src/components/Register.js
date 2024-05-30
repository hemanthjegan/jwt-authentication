import React, { useState } from 'react';
import { register } from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await register(user);
    //         toast.success('User registered successfully');
    //         navigate('/login');
    //     } catch (error) {
    //         toast.error('Error registering user');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(user);
            toast.success('User registered successfully');
            navigate('/login');
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    toast.error('Validation error: ' + error.response.data.message);
                } else if (error.response.status === 500) {
                    toast.error('Server error, please try again later.');
                } else {
                    toast.error('Error: ' + error.response.data.message);
                }
            } else if (error.request) {
                toast.error('Network error, please check your connection.');
            } else {
                toast.error('Error: ' + error.message);
            }
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input name="first_name" placeholder="First Name" required onChange={handleChange} />
            <input name="last_name" placeholder="Last Name" required onChange={handleChange} />
            <input name="email" placeholder="Email" required onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" required onChange={handleChange} /><br></br>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
