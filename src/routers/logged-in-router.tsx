import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Restaurants from '../pages/client/restaurants';
import NotFound from '../pages/404';
import Header from '../components/header';
import useMe from '../hooks/useMe';
import ConfirmEmail from '../pages/user/confirm-email';

const ClientRoutes = [
  <Route key="restaurant" path="/" element={<Restaurants />} />,
];

function LoggedInRouter() {
  const { data, loading, error } = useMe();

  if (loading || error || !data) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-white">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Routes>
        {data.me.role === 'Client' && ClientRoutes}
        <Route path="/confirm" element={<ConfirmEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LoggedInRouter;
