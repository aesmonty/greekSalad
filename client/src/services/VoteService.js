import axios from 'axios';
// import { app_contract_address, api_service_url } from '../../config/common-paths';
// const appContractAbi = require('../../contracts/PoolSharkApp.json').abi;

export const Vote = id => {
  // return new Promise((resolve, reject) => {
  //   const web3 = window.web3;
  //   if (!web3 || !web3.isConnected() || !web3.currentProvider.isMetaMask) {
  //     reject('No web3!');
  //   }

  //   const appContract = web3.eth.contract(appContractAbi).at(app_contract_address);
  //   const account = web3.eth.accounts[0];
  //   if (!account) {
  //     reject('No account!');
  //   }
  //   // https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#new-contract
  //   web3.eth.getTransactionCount(account, (error, txCount) => {
  //     if (error) {
  //       reject(error);
  //     }
  //     appContract.createPool(
  //       id.name,
  //       Number(id.rate),
  //       Number(id.deadline),
  //       {
  //         nonce: txCount,
  //         from: account
  //       },
  //       (err, transactionId) => {
  //         if (err) {
  //           reject(error);
  //         } else {
  //           axios
  //             .post(api_service_url + '/transaction/create', {
  //               address: account,
  //               transaction_id: transactionId,
  //               transaction_type: 'CreatePool'
  //             })
  //             .then(() => {
  //               resolve(transactionId);
  //             })
  //             .catch(err => {
  //               reject(err);
  //             });
  //         }
  //       }
  //     );
  //   });
  // });
};
