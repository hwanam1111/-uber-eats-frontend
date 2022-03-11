import React from 'react';
import { isLoggedInVar } from '../apollo';

function LoggedOutRouter() {
  const onLogin = () => {
    isLoggedInVar(true);
  };

  return (
    <>
      <div>Logged out</div>
      <button type="button" onClick={onLogin}>
        Login Button
      </button>
    </>
  );
}

export default LoggedOutRouter;
