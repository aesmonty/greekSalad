import sys
sys.path.append("lib/")
from bc_admin import *
from Contract import *
import util as u

blockchain_admin = Blockchain_admin(local=True)
m_web3 = blockchain_admin.getWeb3()

# Deploy Contract
cc = Contract('contracts/eduDAO.sol','eduDAO', m_web3, verbose=True)
cc.publish(blockchain_admin.get_account(0),10,3,3)
cc.get_consice_instance().addMember(blockchain_admin.get_account(1),"andres",u.hash("andres"))

'''
 newProposal(
        address[] beneficiaries,
        uint weiAmount,
        string jobDescription,
        string educourse,
        uint[] amountPerPerson
    )
'''

val = cc.get_def_instance().functions.newProposal([blockchain_admin.get_account(1),
                                      blockchain_admin.get_account(0),
                                      blockchain_admin.get_account(0)],10,
                                      "This is an amazing project","BDL",
                                      [10,0,0]).transact()
print(val)
'''
    function vote(
        uint proposalNumber,
        bool supportsProposal,
        string justificationText
    )
'''
vote = cc.get_def_instance().functions.vote(0,True,"I love this shit").call()
var = cc.get_def_instance().functions.getProposalDescription(0).call()

print(var)
