// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Importamos nosso serviço de API

function HomePage() {
    // Criamos um estado 'posts' para armazenar a lista de posts que virá da API
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Criamos uma função para buscar os dados
        const fetchPosts = async () => {
            try {
                const response = await api.get('/posts'); // Faz a chamada GET para a nossa API
                setPosts(response.data); // Armazena a resposta no nosso estado 'posts'
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
                // Aqui poderíamos definir uma mensagem de erro para o usuário
            }
        };

        fetchPosts(); // Executamos a função
    }, []); // O array vazio [] significa que este efeito só roda uma vez

    return (
        <div>
            <h1>Posts Recentes</h1>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} style={{ border: '1px solid #555', padding: '10px', margin: '10px 0' }}>
                        <h2>{post.title}</h2>
                        <p>por {post.author} em {new Date(post.date_posted).toLocaleDateString()}</p>
                        <p>{post.content}</p>
                    </div>
                ))
            ) : (
                <p>Nenhum post encontrado. Crie um para começar!</p>
            )}
        </div>
    );
}

export default HomePage;