import sys
sys.path.append("lib/")
from bc_admin import *
from Contract import *
import util as u

blockchain_admin = Blockchain_admin(local=True)
m_web3 = blockchain_admin.getWeb3()

# Deploy Contract
cc = Contract('contracts/eduDAO.sol','eduDAO', m_web3, verbose=False)
cc.publish(blockchain_admin.get_account(0),10,3,1)
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
                                      blockchain_admin.get_account(0)],
                                      10,
                                      "This is an amazing project",
                                      "Don Aggelos",
                                      "BDL",
                                      [10,0,0]).transact()
print(val)

vote = cc.get_def_instance().functions.vote(0,True,"I love this shit").transact()
var = cc.get_def_instance().functions.getProposalDescription(0).call()

getVote = cc.get_def_instance().functions.getProposalVotes(0).call()

def getProposals():
    noProposals = cc.get_def_instance().functions.getNumberProposals().call()
    print(noProposals)
    for i in range (0,noProposals):
        title = cc.get_def_instance().functions.getProposalTitle(i).call()
        print("Contract title {}".format(title))

getProposals()
print(getVote)

