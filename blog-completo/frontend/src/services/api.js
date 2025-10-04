// src/services/api.js
import axios from 'axios';

// Cria uma instância do axios com a URL base do nosso backend Flask
const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

/*
Aqui vamos adicionar um "interceptor". É uma função que será
executada ANTES de cada requisição ser enviada.
Sua função é pegar o token JWT do localStorage e adicioná-lo
no cabeçalho de autorização, para que o backend saiba quem somos.
*/
api.interceptors.request.use(async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;