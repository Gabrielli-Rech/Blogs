// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', {
                email: email,
                password: password
            });

            // Ponto-chave: Pegamos o token da resposta e salvamos no navegador
            localStorage.setItem('token', response.data.access_token);

            alert('Login bem-sucedido!');
            navigate('/'); // Redireciona para a página inicial

        } catch (error) {
            if (error.response) {
                alert('Erro no login: ' + error.response.data.message);
            } else {
                alert('Não foi possível conectar ao servidor.');
            }
            console.error('Falha no login:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginPage;