import axios from 'axios';

export default axios.create({
    baseURL: 'http://real-home.iptime.org:3333' + '/api',
    withCredentials: true
});