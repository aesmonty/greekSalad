// IMPORT PACKAGE REFERENCES

import React from 'react';
import { CreatePool } from '../CreatePool/CreatePool';

// COMPONENT

const NewProposalPage = () => (
  <div>
    <div
      className="jumbotron jumbotron-fluid light-blue-top animated bottom-dark-border"
      style={{ marginBottom: 0, backgroundColor: '#c6cce3' }}
    >
      <div className="text-center">
        <h1 className="title-text text-shadow-simple">Create New Proposal</h1>
      </div>
    </div>
    <CreatePool />
  </div>
);

export { NewProposalPage };
