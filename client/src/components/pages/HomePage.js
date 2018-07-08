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
        <div
          className="jumbotron jumbotron-fluid light-blue-top animated bottom-dark-border"
          style={{ marginBottom: 0, backgroundColor: '#c6cce3' }}
        >
          <div className="text-center">
            <h3 className="title-text text-shadow-simple">Welcome {this.props.accounts[0]}!</h3>
          </div>
          <div className="text-center">
            <h2 className="dark-blue-text text-shadow-simple">Ethereum powered DAPP</h2>
          </div>
        </div>
        <Home id={this.props.accounts[0]} />
      </div>
    );
  }
}

HomePage.propTypes = {
  accounts: PropTypes.array
};

const mapStateToProps = state => {
  const { accounts } = state.accounts;

  return { accounts };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const hoc = connect(mapStateToProps, mapDispatchToProps)(HomePage);

// EXPORT COMPONENT

export { hoc as HomePage };
