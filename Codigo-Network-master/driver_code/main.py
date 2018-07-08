import sys
sys.path.append("lib/")
from bc_admin import *
from Contract import *
import util as u
import random

proposals = [
    dict(
        id=0,
<<<<<<< HEAD
        title="Add different crops to our wheat farm",
        beneficiaries=['Zoe Xia', 'Afia Monty', 'Akua Mo'],
        description='Before adding new crops, we want to learn how to organise our land to increase yield with less fertilisers and water. ',
        course='Biodynamics-101',
=======
        title="learn ARG-101 and start a wheat farm",
        beneficiaries=['Zoe Xia', 'Andre Monty', 'Steph Mo'],
        description='We are going to complete the "Introduction to Arguculture" course and start a wheat farm.',
        course='ARG-101',
>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92
        amount_per_person=[100, 110, 80],
        amount=290,
        voted=False
    ),
    dict(
        id=1,
<<<<<<< HEAD
        title="Sell our honey in Italy ",
        beneficiaries=['Afolabi Nao', 'Ekua G'],
        description='We have a surplus of organic honey and we want to sell it to the world. We want to find out which countries are easiest to reach, how we should advertise our product, how we can maximise our profit through OpenBazaar ',
=======
        title="Expand our fishing business with the advanced fishing course",
        beneficiaries=['Sot Nao', 'Eliz G'],
        description='We are aiming to expanding our fishing business and we will first learn "Extreme Fishing"',
>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92
        course='FISH-402',
        amount_per_person=[300, 300],
        amount=600,
        voted=False
    ),
    dict(
        id=2,
<<<<<<< HEAD
        title="Learn how our legal system works",
        beneficiaries=['Gao Inuqia'],
        description='Our team has grown and we are thinking of becoming a legal business. What will our rights and responsibilities be?',
=======
        title="Learn society's value and culture",
        beneficiaries=['Sot Nao'],
        description='We are aiming to expanding our fishing business and we will first learn "Extreme Fishing"',
        course='SOC-201',
        amount_per_person=[200],
        amount=200,
        voted=False
    ),    
    dict(
        id=3,
        title="Proposal 4",
        beneficiaries=['Sot Nao'],
        description='We are aiming to expanding our fishing business and we will first learn "Extreme Fishing"',
>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92
        course='SOC-201',
        amount_per_person=[200],
        amount=200,
        voted=False
    )
]

<<<<<<< HEAD
=======


>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92
public_key_mapping = {
    0: 'Zack',
    1: 'Andres',
    2: 'Stephane',
    3: 'Eliza',
    4: 'Sotiris'
}

blockchain_admin = Blockchain_admin(local=True)
m_web3 = blockchain_admin.getWeb3()

# Deploy Contract
<<<<<<< HEAD
cc = Contract('contracts/eduDAO.sol','eduDAO', m_web3, verbose=True)
contract = cc.publish(blockchain_admin.get_account(0),10,3,3)
cc.save_abi("contract_abi.json")
cc.get_consice_instance().addMember(blockchain_admin.get_account(1),"andres",u.hash("andres"))

for proposal in proposals:
    u1, u2, u3 = random.sample(range(0, 5), 3)
    q1, q2, q3 = random.sample(range(3, 1000), 3)
    total_amount = q1 + q2 + q3    
    val = cc.get_def_instance().functions.newProposal([blockchain_admin.get_account(u1),
                                      blockchain_admin.get_account(u2),
                                      blockchain_admin.get_account(u3)],
                                      total_amount,
                                      proposal['description'],
                                      proposal['course'],
                                      [q1,q2,q3]).transact()
=======
<<<<<<< Updated upstream
cc = Contract('contracts/eduDAO.sol','eduDAO', m_web3, verbose=False)
cc.publish(blockchain_admin.get_account(0),10,3,1)
=======
cc = Contract('contracts/eduDAO.sol','eduDAO', m_web3, verbose=True)
contract = cc.publish(blockchain_admin.get_account(0),10,3,3)
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92



cc.get_def_instance().functions.vote(0,True,"A string").transact()

<<<<<<< HEAD
print(cc.get_def_instance().functions.getProposalVotes(0).call())
=======
=======
for proposal in proposals:
    u1, u2, u3 = random.sample(range(0, 5), 3)
    q1, q2, q3 = random.sample(range(3, 1000), 3)
    total_amount = q1 + q2 + q3    
    val = cc.get_def_instance().functions.newProposal([blockchain_admin.get_account(u1),
                                      blockchain_admin.get_account(u2),
                                      blockchain_admin.get_account(u3)],
                                      total_amount,
                                      proposal['description'],
                                      proposal['course'],
                                      [q1,q2,q3]).transact()
>>>>>>> Stashed changes
>>>>>>> 94f8986d96e80609b02a67cf924d281f5b139a92
