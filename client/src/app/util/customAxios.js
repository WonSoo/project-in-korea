import axios from 'axios';

export default axios.create({
    baseURL: 'http://d14dd36b.ngrok.io' + '/api',
    withCredentials: true
});