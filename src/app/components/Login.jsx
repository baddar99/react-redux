import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const Login = ({ authenticateUser }) => {
  return (
    <div>
      <h2>Please Login!</h2>
      <form onSubmit={authenticateUser}>
        <input
          type='text'
          name='userName'
          placeholder='User Name'
          defaultValue='Dev'
        />
        <input
          type='text'
          name='password'
          placeholder='Password'
          defaultValue=''
        />
        <button type='submit'>Login!</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  authenticateUser(e) {
    e.preventDefault();
    const userName = e.target['userName'].value;
    const password = e.target['password'].value;
    dispatch(mutations.requestAuthenticateUser(userName, password));
  },
});

export const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
