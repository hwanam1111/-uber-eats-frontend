import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { meQuery } from '../__api__/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

function LoggedInRouter() {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-white">Loading...</span>
      </div>
    );
  }

  return <div>Logged in router</div>;
}

export default LoggedInRouter;
