// IMPORT PACKAGE REFERENCES

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Web3Provider } from '../Web3/Web3Provider';

// COMPONENT

export const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light alert-dark">
    {/*<div className="top-nav"><div className="top-nav-inner">Shark of The Pool</div><div className="check-icon"><CheckIcon /></div></div>*/}
    <a className="navbar-brand" href="/">
      <img className="logo-image" src={ require('../../images/logo.svg') } />
    </a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="menu">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <div className="nav-link">
            <NavLink to='/pool' activeClassName='menu selected' exact={true}>Find Pool</NavLink>
          </div>
        </li>
        <li className="nav-item">
          <div className="nav-link">
            <NavLink to='/about' activeClassName='menu selected'>My Pools</NavLink>
          </div>
        </li>
      </ul>
      <Web3Provider />
    </div>
  </nav>
);