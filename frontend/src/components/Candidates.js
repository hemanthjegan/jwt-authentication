import React, { useState, useEffect } from 'react';
import { getCandidates, addCandidate } from '../api';
import { toast } from 'react-toastify';

const Candidates = ({ token }) => {
    const [candidates, setCandidates] = useState([]);
    const [newCandidate, setNewCandidate] = useState({ first_name: '', last_name: '', email: '' });

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const { data } = await getCandidates(token);
                setCandidates(data);
            } catch (error) {
                console.error('Error fetching candidates', error);
            }
        };

        fetchCandidates();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCandidate({ ...newCandidate, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCandidate(newCandidate, token);
            setCandidates([...candidates, newCandidate]);
            setNewCandidate({ first_name: '', last_name: '', email: '' });
            toast.success('Candidate added successfully');
        } catch (error) {
            console.error('Error adding candidate', error);
            toast.error('Error adding candidate');
        }
    };

    return (
        <div>
            <h1>Candidates</h1>
            <form onSubmit={handleSubmit}>
                <input name="first_name" placeholder="First Name" onChange={handleChange} />
                <input name="last_name" placeholder="Last Name" onChange={handleChange} />
                <input name="email" placeholder="Email" onChange={handleChange} />
                <button type="submit">Add Candidate</button>
            </form>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>
                        {candidate.first_name} {candidate.last_name} ({candidate.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Candidates;
