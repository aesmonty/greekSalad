import React from 'react';
import ReduxMenu from './reduxMenu';

const Menu = () => (
  <ReduxMenu>
    <a id="home" className="menu-item menu-link" href="/">
      Home
    </a>
    <a id="pools" className="menu-item menu-link" href="/pools">
      Pool Explorer
    </a>
    <a id="my-pools" className="menu-item menu-link" href="/mypools">
      My Pools
    </a>
    <a id="create-pool" className="menu-item menu-link" href="/create">
      Create Pool
    </a>
  </ReduxMenu>
);

export { Menu };
