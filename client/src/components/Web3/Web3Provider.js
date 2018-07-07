import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchAccounts } from '../state/actions/Web3Actions';

class Web3Provider extends Component {
  constructor(props) {
    super(props);
    this.props.fetchAccounts();
  }

  /**
   * Start polling accounts, & network. We poll indefinitely so that we can
   * react to the user changing accounts or networks.
   */
  componentDidMount() {
    this.props.fetchAccounts();
  }

  render() {
    return null;
  }
}

Web3Provider.propTypes = {
  fetchAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.array.isRequired,
  accounts_fetched: PropTypes.bool.isRequired,
  account_exists: PropTypes.bool.isRequired,
  account_selected: PropTypes.string,
  network_id: PropTypes.string,
  network_fetched: PropTypes.bool.isRequired,
  onChangeAccount: PropTypes.func,
  web3error: PropTypes.any,
  accountUnavailableScreen: PropTypes.any
};

const mapStateToProps = state => {
  const { accounts_fetched, account_exists, account_selected, accounts } = state.accounts;
  const { network_fetched, network_id } = state.network;

  return { accounts_fetched, account_exists, accounts, account_selected, network_fetched, network_id };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchAccounts }, dispatch);

const hoc = connect(mapStateToProps, mapDispatchToProps)(Web3Provider);

// EXPORT COMPONENT

export { hoc as Web3Provider };
