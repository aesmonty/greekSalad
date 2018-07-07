pragma solidity ^0.4.24;

contract owned {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

   

    function transferOwnership(address newOwner) onlyOwner  public {
        owner = newOwner;
    }
}

contract tokenRecipient {
    event receivedEther(address sender, uint amount);
    event receivedTokens(address _from, uint256 _value, address _token, bytes _extraData);

    function receiveApproval(address _from, uint256 _value, address _token, bytes _extraData) public {
        Token t = Token(_token);
        require(t.transferFrom(_from, this, _value));
        emit receivedTokens(_from, _value, _token, _extraData);
    }

    function () payable  public {
        emit receivedEther(msg.sender, msg.value);
    }
}

interface Token {
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}

contract eduDAO is owned, tokenRecipient {
    // Contract Variables and events
    uint public minimumQuorum;
    uint public debatingPeriodInMinutes;
    int public majorityMargin;
    Proposal[] public proposals;
    uint public numProposals;
    mapping (address => uint) public memberId;
    Member[] public members;
    uint256 DAObalance;

    //GETTERS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function getDaoBalance() public view returns (uint256) {return DAObalance;}
    
    function getProposalDescription(uint proposalID) public view returns (string){
        return proposals[proposalID].description;
    }
    function getProposalVotes(uint proposalID) public view returns (uint){
        return proposals[proposalID].numberOfVotes;
    }
    function getProposalEduRequirements(uint proposalID) public view returns (string){
        return proposals[proposalID].eduCourse;
    }
    function getProposalFunding(uint proposalID) public view returns (uint){
        return proposals[proposalID].amount;
    }
    




    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //EVENTS

    event ProposalAdded(uint proposalID, address recipient, uint amount, string description);
    event Voted(uint proposalID, bool position, address voter, string justification);
    event ProposalTallied(uint proposalID, int result, uint quorum, bool active);
    event MembershipChanged(address member, bool isMember);
    event ChangeOfRules(uint newMinimumQuorum, uint newDebatingPeriodInMinutes, int newMajorityMargin);

    modifier onlyMember {
        require(memberId[msg.sender] != 0 || msg.sender == owner);
        _;
    }

    struct Proposal {
        address[3] recipients;
        uint[3] amountPerson;
        bool[3] validated;
        uint amount;
        string description;
        string eduCourse;
        
        bool eduSubmitted;
        uint minExecutionDate;
        bool executed;
        bool proposalPassed;
        uint numberOfVotes;
        int currentResult;
        bytes32 proposalHash;
        Vote[] votes;
        mapping (address => bool) voted;
    }

    struct Member {
        address member;
        string name;
        uint memberSince;
        Cert[] cert;
        uint256 qiAmount;
    }

    struct Cert {
        string name;
        bytes32 certhash;
    }

    struct Vote {
        bool inSupport;
        address voter;
        string justification;
    }

    // Modifier that allows only shareholders to vote and create new proposals
    modifier onlyMembers {
        require(memberId[msg.sender] != 0);
        _;
    }

    /**
     * Constructor function
     */
    constructor (
        uint minimumQuorumForProposals,
        uint minutesForDebate,
        int marginOfVotesForMajority
    )   public {
        //owner = msg.sender;
        minimumQuorum = minimumQuorumForProposals;
        debatingPeriodInMinutes = minutesForDebate;
        majorityMargin = marginOfVotesForMajority;
        // It’s necessary to add an empty first member
        addMember(0, "","");
        // and let's add the founder, to save a step later
        addMember(msg.sender, "founder", bytes32(0));//keccak256("founder"));
        DAObalance = 1000000; // ASSUME THAT DAO IS PREFUNDED WITH THIS AMOUNT OF MONEY
    }

    /**
     * Add member
     *
     * Make `targetMember` a member named `memberName`
     *
     * @param targetMember ethereum address to be added
     * @param memberName public name for that member
     */
    function addMember(address targetMember, string memberName, bytes32 nameValidHash)  public {

        //require(keccak256(memberName) == nameValidHash, "KYC process, name valid");
        uint id = memberId[targetMember];
        if (id == 0) {
            memberId[targetMember] = members.length;
            id = members.length++;
        }
        Member storage tempMemb;
        tempMemb.member = targetMember;
        tempMemb.memberSince = now;
        tempMemb.name = memberName;
        tempMemb.qiAmount = 0;
        members[id] = tempMemb;
        emit MembershipChanged(targetMember, true);
    }

    /**
     * Remove member
     *
     * @notice Remove membership from `targetMember`
     *
     * @param targetMember ethereum address to be removed
     */
    function removeMember(address targetMember) onlyOwner public {
        require(memberId[targetMember] != 0);

        for (uint i = memberId[targetMember]; i<members.length-1; i++){
            members[i] = members[i+1];
        }
        delete members[members.length-1];
        members.length--;
    }

    /**
     * Add Proposal
     *
     * Propose to send `weiAmount / 1e18` ether to `beneficiary` for `jobDescription`. `transactionBytecode ? Contains : Does not contain` code.
     *
     * @param weiAmount amount of ether to send, in wei
     * @param jobDescription Description of job
     */
    function newProposal(
        address[3] beneficiaries,
        uint weiAmount,
        string jobDescription,
        string educourse,
        uint[3] amountPerPerson
    )
        onlyMembers public
        returns (uint proposalID)
    {
        
        uint calc = 0;

        for (uint256 k = 0 ; k < amountPerPerson.length ; k++){
            require(amountPerPerson[k] >= 0);
            calc += amountPerPerson[k];
        }

        require(calc == weiAmount);


        proposalID = proposals.length++;
        Proposal storage p = proposals[proposalID];
        p.recipients = beneficiaries;
        p.amountPerson = amountPerPerson;
        p.amount = weiAmount;
        p.eduCourse = educourse;
        p.description = jobDescription;
        p.proposalHash = keccak256(beneficiaries[0], weiAmount);
        p.minExecutionDate = now + debatingPeriodInMinutes * 1 minutes;
        p.executed = false;
        p.proposalPassed = false;
        p.numberOfVotes = 0;
        //proposals[proposalID] = p;
        for (uint8 i = 0; i < beneficiaries.length; ++i){
            emit ProposalAdded(proposalID, beneficiaries[i], weiAmount, jobDescription);
        }
        numProposals = proposalID+1;

        return proposalID;
    }

    function joinProposal(uint proposalID) public{

        Proposal storage p = proposals[proposalID];

        for (uint8 i = 0; i < p.recipients.length; i++){

            if (p.recipients[i] == msg.sender && p.validated[i] == false){
                p.validated[i] = true;
            }
        }
        //TODOOOOOOOOOOO: EMIT EVENT TO JOIN PROPOSAL
    }

    function submitEducationProof(string educourse, uint proposalID) public {

        Proposal storage p = proposals[proposalID];
        p.eduSubmitted = (keccak256(p.eduCourse) == keccak256(educourse));

    }

    /**
     * Check if a proposal code matches
     *
     * @param proposalNumber ID number of the proposal to query
     * @param weiAmount amount of ether to send
     */
    function checkProposalCode(
        uint proposalNumber,
        address[] beneficiaries,
        uint weiAmount    )
        view public
        returns (bool codeChecksOut)
    {
        Proposal storage p = proposals[proposalNumber];
        return p.proposalHash == keccak256(beneficiaries[0], weiAmount);
    }

    /**
     * Log a vote for a proposal
     *
     * Vote `supportsProposal? in support of : against` proposal #`proposalNumber`
     *
     * @param proposalNumber number of proposal
     * @param supportsProposal either in favor or against it
     * @param justificationText optional justification text
     */
    function vote(
        uint proposalNumber,
        bool supportsProposal,
        string justificationText
    )
        onlyMembers public
        returns (uint voteID)
    {
        Proposal storage p = proposals[proposalNumber]; // Get the proposal
        require(!p.voted[msg.sender]);                  // If has already voted, cancel
        p.voted[msg.sender] = true;                     // Set this voter as having voted
        p.numberOfVotes++;                              // Increase the number of votes
        if (supportsProposal) {                         // If they support the proposal
            p.currentResult++;                          // Increase score
        } else {                                        // If they don't
            p.currentResult--;                          // Decrease the score
        }

        // Create a log of this event
        emit Voted(proposalNumber,  supportsProposal, msg.sender, justificationText);
        return p.numberOfVotes;
    }

    /**
     * Finish vote
     *
     * Count the votes proposal #`proposalNumber` and execute it if approved
     *
     * @param proposalNumber proposal number
     */
    function executeProposal(uint proposalNumber) public {
        Proposal storage p = proposals[proposalNumber];

        require(now > p.minExecutionDate); 
        require(p.numberOfVotes >= minimumQuorum);                                
        require(!p.executed && p.proposalHash == keccak256(p.recipients[0], p.amount));
        // ...then execute result

        if (p.currentResult > majorityMargin) {
            // Proposal passed; execute the transaction

            p.executed = true; // Avoid recursive calling

            for (uint i = 0; i < p.recipients.length; i++){

                p.recipients[i].transfer(p.amountPerson[i]);

            }

            p.proposalPassed = true;
        } else {
            // Proposal failed
            p.proposalPassed = false;
        }

        // Fire Events
        emit ProposalTallied(proposalNumber, p.currentResult, p.numberOfVotes, p.proposalPassed);
    }

    event receivedDonation(address sender, uint amount, string donation);


    function () payable public {  //This is like the donation function

        emit receivedDonation(msg.sender, msg.value, "We have received a donation"); 
    }
    
}
