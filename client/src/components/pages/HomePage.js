// IMPORT PACKAGE REFERENCES

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Home } from '../Home/Home';

// COMPONENT

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className="banner jumbotron jumbotron-fluid light-blue-top animated bottom-dark-border">
          <div className="text-center">
            <h1 className="title-text text-shadow-simple">Welcome {this.props.accounts[0]}!!!!!</h1>
          </div>
          <div className="text-center">
            <h2 className="dark-blue-text text-shadow-simple">Ethereum powered DAPP</h2>
          </div>
        </div>
        <Home />
      </div>
    );
  }
}

HomePage.propTypes = {
  accounts: PropTypes.array
};

// export { HomePage };

const mapStateToProps = state => {
  const { accounts, accounts_fetched, account_selected } = state.accounts;
  const { network_fetched, network_id } = state.network;

  return { accounts, accounts_fetched, account_selected, network_fetched, network_id };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const hoc = connect(mapStateToProps, mapDispatchToProps)(HomePage);

// EXPORT COMPONENT

export { hoc as HomePage };
