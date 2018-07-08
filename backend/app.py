from flask import Flask, jsonify
from data import *
from time import sleep

app = Flask(__name__)

scanned = False

@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/proposals')
def get_proposals():
    return jsonify(proposals)


@app.route('/scanned')
def is_scanned():
    global scanned
    print(scanned)
    scanned = True
    return 'course completed!'


@app.route('/course_completed')
def course_completed():
    global scanned
    if not scanned:
        return "false"
    else:
        scanned = False
        return "true"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8020)
    # app.run()
