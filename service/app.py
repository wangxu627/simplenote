from http import HTTPStatus
from flask import Flask, jsonify, request, make_response, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

def read_content():
    with open("content", "r") as f:
        return f.read()

def write_content(value):
    with open("content", "w") as f:
        return f.write(value)

@app.route("/content", methods=['GET', 'POST'])
def content():
    if(request.method == "GET"):
        content = read_content() or ''
        return make_response(jsonify({"content": content}), HTTPStatus.OK)
    elif(request.method == "POST"):
        content = request.json
        write_content(content['content'])
        return make_response(jsonify({}), HTTPStatus.OK)

@app.route("/")
def index():
    return render_template('index.html')