// Set config defaults when creating the instance
const axios = require('axios');


const instance = axios.create({
    // baseURL: 'https://simbir-events.herokuapp.com/'
    baseURL: 'http://localhost:8080/'
});

export const getAllParticipants = () => instance.get('getAllParticipants/?eventId=1')
    .then(function (response) {
        return response.data
    });

export const getCities = () => instance.get('getCity')
    .then(function (response) {
        return response.data
    });

export const getEvents = () => instance.get('getEvents/?userId=1&date="2022-09-11"&cityId=1')
    .then(function (response) {
        return response.data
    });
