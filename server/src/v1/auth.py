from flask import jsonify, request, current_app
from db import Db
import jwt
import datetime

def jwt_token_required():
    token = request.args.get('token')
    if not token:
        return jsonify({'message': 'Token is required'}), 403
    if not verify_token(token):
        return jsonify({'message': 'Token is invalid or expired'}), 403

def verify_token(token):
    try:
        decoded_token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms='HS256')
    except:
        return False
    return decoded_token

def login(username, password):
    # TODO: use the database to verify the username and password
    db = Db.get_instance()
    db.connect().ping()
    sql = "SELECT username,password FROM users where username=\""+ username+"\" AND password = \""+password+"\""
    tkn = db.fetchone(sql)
    if tkn is not None:
        payload = {
            'username': username,
            'id': 100,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        #current_app.config['token'] = token        
        return token
    return False