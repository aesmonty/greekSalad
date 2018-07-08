// IMPORT PACKAGE REFERENCES

import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// IMPORT PROJECT REFERENCES

import { HomePage } from '../pages/HomePage';
import { MembersPage } from '../pages/MembersPage';
import { NewProposalPage } from '../pages/NewProposalPage';

// COMPONENT

export const AppRouter = () => (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/members" component={MembersPage} />
        <Route path="/new-proposal" component={NewProposalPage} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </BrowserRouter>
);
