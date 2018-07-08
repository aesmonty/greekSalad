const appContractAbi = require('../../contracts/app.json');

export const Vote = id => {
  return new Promise((resolve, reject) => {
    const web3 = window.web3;
    if (!web3 || !web3.isConnected() || !web3.currentProvider.isMetaMask) {
      reject('No web3!');
    }

    const appContract = web3.eth.contract(appContractAbi).at('0x7F5c612d69b2F26236Bb7E473FD6DAC096380a8f');
    const account = web3.eth.accounts[0];
    if (!account) {
      reject('No account!');
    }
    appContract.vote.sendTransaction(id, true, 'lalala', { from: account }, function(err, res) {
      if (err) {
        console.error(err);
      } else {
        console.log('We gucci');
      }
    });
  });
};
