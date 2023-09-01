import axios from 'axios';



const vanliApi = axios.create({
    baseURL: '/api'
});


export default vanliApi;