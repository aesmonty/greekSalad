import React from 'react';
import ReduxMenu from './reduxMenu';
import logo from '../../images/logo.png';

const Menu = () => (
  <ReduxMenu>
    <img
      src={logo}
      style={{
        width: '80px',
        marginLeft: '15px'
      }}
    />
    <a id="home" className="menu-item menu-link" href="/">
      Home
    </a>
    <a id="members" className="menu-item menu-link" href="/members">
      Members
    </a>
    <a id="create-pool" className="menu-item menu-link" href="/new-proposal">
      New proposal
    </a>

    <a id="find-course" className="menu-item menu-link">
      Find me a course
    </a>

    <a id="bazaar" className="menu-item menu-link">
      Open Bazaar
    </a>

    <a id="qi" className="menu-item menu-link">
      Qi Exchange
    </a>


  </ReduxMenu>
);

export { Menu };
