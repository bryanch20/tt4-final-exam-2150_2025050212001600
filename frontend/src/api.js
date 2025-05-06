import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5125/api/Expense', 
});

export default API;
