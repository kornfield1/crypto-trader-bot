from flask import Blueprint, jsonify, request

user_bp = Blueprint('user', __name__)

@user_bp.route('/health', methods=['GET'])
def health_check():
    """
    Endpoint para verificação de saúde da API
    """
    return jsonify({
        "status": "success",
        "message": "API is running"
    })
