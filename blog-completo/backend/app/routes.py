from flask import Blueprint, request, jsonify
from .models import Post
from . import db
from flask_jwt_extended import jwt_required, get_jwt_identity

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return jsonify({'message': 'Bem-vindo à API do Blog!'})

@main.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.order_by(Post.date_posted.desc()).all()
    posts_list = []
    for post in posts:
        posts_list.append({
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'date_posted': post.date_posted.isoformat(),
            'author': post.author.username
        })
    return jsonify(posts_list)

@main.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    # ADICIONADO PARA DEPURAR
    print("CABEÇALHOS RECEBIDOS:", request.headers)
    print("CORPO RECEBIDO:", request.get_data(as_text=True))
    
    data = request.get_json()
    
    # ADICIONADO PARA SEGURANÇA
    if not data:
        return jsonify({"message": "Nenhum dado JSON recebido ou Content-Type incorreto."}), 400

    current_user_id = get_jwt_identity()['id']
    
    new_post = Post(title=data['title'], content=data['content'], user_id=current_user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post criado com sucesso!'}), 201