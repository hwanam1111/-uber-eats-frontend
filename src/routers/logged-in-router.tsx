import React from 'react';
import { isLoggedInVar } from '../apollo';

function LoggedInRouter() {
  const onLogOut = () => {
    isLoggedInVar(false);
  };

  return (
    <>
      <div>Logged in router</div>
      <button type="button" onClick={onLogOut}>
        Logout Button
      </button>
    </>
  );
}

export default LoggedInRouter;
