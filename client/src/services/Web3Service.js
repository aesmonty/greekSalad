export const fetchNetwork = () => {
  return new Promise((resolve, reject) => {
    const { web3 } = window;

    web3 &&
      web3.version &&
      web3.version.getNetwork((err, netId) => {
        if (err) {
          reject(err);
        } else {
          resolve(netId);
        }
      });
  });
};

export const fetchAccounts = () => {
  return new Promise(resolve => {
    const ethAccounts = getAccounts();
    resolve(ethAccounts);
  });
};

function getAccounts() {
  try {
    const { web3 } = window;
    // throws if no account selected
    return web3.eth.accounts;
  } catch (e) {
    return [];
  }
}
