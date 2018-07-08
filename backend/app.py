from flask import Flask, jsonify
from data import *
from Compact_Contract import Compact_Contract
from bc_admin import Blockchain_admin

app = Flask(__name__)

scanned = False

ba = Blockchain_admin(True)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/proposals')
def get_proposals():
    global ba
    cc = Compact_Contract('abi.json', 'eduDAO', ba.getWeb3(), '0x166f031F1DFA7fc9dcDe6fc7a8A379B33E63eE31')
    for proposal in proposals:
        val = cc.get_consice_instance().getProposalVotes(proposal['id'])
        print(val)
        proposal['voted'] = (val != 0)
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
