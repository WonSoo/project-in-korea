import axios from 'axios';

export default axios.create({
    baseURL: 'http://6e47a03f.ngrok.io' + '/api',
    withCredentials: true
});