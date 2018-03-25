import axios from 'axios';

export default axios.create({
    baseURL: 'https://1ed8662c.ngrok.io' + '/api',
    withCredentials: false
});