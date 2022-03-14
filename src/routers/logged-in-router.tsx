import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { meQuery } from '../__api__/meQuery';
import Restaurants from '../pages/client/restaurants';
import NotFound from '../pages/404';

const ClientRoutes = [<Route path="/" element={<Restaurants />} />];

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

  return (
    <Router>
      <Routes>
        {data.me.role === 'Client' && ClientRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LoggedInRouter;
