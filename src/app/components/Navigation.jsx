import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navigation = () => {
  return (
    <Link to='/dashboard'>
      <h1>My Application</h1>
    </Link>
  );
};

export const ConnectedNavigation = connect(state => state)(Navigation);
