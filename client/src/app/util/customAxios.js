import axios from 'axios';

export default axios.create({
    baseURL: 'https://0c1601e0.ngrok.io' + '/api',
    withCredentials: true
});