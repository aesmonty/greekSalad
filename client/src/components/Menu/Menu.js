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
  </ReduxMenu>
);

export { Menu };
