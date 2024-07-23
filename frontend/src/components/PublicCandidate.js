import React, { useState, useEffect } from 'react';
import { getPublicCandidates } from '../api';

const Profile = ({ apiKey, userId }) => {
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPublicCandidates(apiKey, userId);
                setCandidate(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [apiKey, userId]);

    if (!candidate) {
        return <p>Loading...</p>;
    }

    console.log(candidate);

    return (
        <div>
            <h1>Profile</h1>
            <ul>
                {candidate.map((candidate, index) => (
                    <li key={index}>
                        {candidate.first_name} {candidate.last_name} ({candidate.email})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
