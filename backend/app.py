from flask import Flask, jsonify
from backend.data import *

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/proposals')
def get_proposals():
    return jsonify(proposals)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8020)
    # app.run()