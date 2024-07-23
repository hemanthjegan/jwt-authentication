import React, { useState, useEffect } from 'react';
import { getProfile } from '../api';

const Profile = ({ apiKey, userId }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfile(apiKey, userId);
                setProfile(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [apiKey, userId]);

    if (!profile) {
        return <p>Loading...</p>;
    }

    console.log(profile);

    return (
        <div>
            <h1>Profile</h1>
            <p>First Name: {profile.first_name}</p>
            <p>Last Name: {profile.last_name}</p>
            <p>Email: {profile.email}</p>
        </div>
    );
};

export default Profile;
