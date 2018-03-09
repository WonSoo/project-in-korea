import axios from 'axios';

export default axios.create({
    baseURL: 'http://192.168.0.14:3000' + '/api'
});