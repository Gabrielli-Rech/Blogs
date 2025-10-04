// src/pages/CreatePostPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/posts', {
                title: title,
                content: content
            });

            alert('Post criado com sucesso!');
            navigate('/'); // Redireciona para a home para ver o novo post

        } catch (error) {
            // Graças ao nosso api.js, o token já foi enviado.
            // Se houver erro, pode ser token expirado ou inválido.
            if (error.response && error.response.status === 401) {
                alert('Sua sessão expirou. Por favor, faça login novamente.');
                navigate('/login');
            } else {
                alert('Ocorreu um erro ao criar o post.');
                console.error('Erro ao criar post:', error);
            }
        }
    };

    return (
        <div>
            <h1>Criar Novo Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Conteúdo:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                    />
                </div>
                <button type="submit">Publicar</button>
            </form>
        </div>
    );
}

export default CreatePostPage;