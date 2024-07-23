import axios from 'axios';

const mainServiceUrl = process.env.REACT_APP_MAIN_SERVICE_URL;
const publicApiUrl = process.env.REACT_APP_PUBLIC_API_URL;

export const register = async (user) => {
    return (await axios.post(`${mainServiceUrl}/api/register`, user)).data;
};

export const login = async (credentials) => {
    return axios.post(`${mainServiceUrl}/api/login`, credentials);
};

export const addCandidate = async (candidate, token) => {
    return axios.post(`${mainServiceUrl}/api/candidate`, candidate, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getCandidates = async (token) => {
    return axios.get(`${mainServiceUrl}/api/candidate`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const getProfile = async (apiKey, userId) => {
    return axios.post(`${publicApiUrl}/api/public/profile`, null, {
        headers: {
            'x-api-key': apiKey,
            'user_id': userId
        }
    });
};

export const getPublicCandidates = async (apiKey, userId) => {
    return axios.get(`${publicApiUrl}/api/public/candidate`, null, {
        headers: {
            'x-api-key': apiKey,
            'user_id': userId
        }
    });
};
