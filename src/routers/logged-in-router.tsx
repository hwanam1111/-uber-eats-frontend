import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Restaurants from '../pages/client/restaurants';
import NotFound from '../pages/404';
import Header from '../components/header';
import useMe from '../hooks/useMe';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from '../pages/user/edit-profile';
import Search from '../pages/client/search';
import Category from '../pages/client/category';
import Restaurant from '../pages/client/restaurant';
import MyRestaurants from '../pages/owner/my-restaurants';

const commonRoutes = [
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
];

const clientRoutes = [
  {
    path: '/',
    component: <Restaurants />,
  },
  {
    path: '/search',
    component: <Search />,
  },
  {
    path: '/category/:slug',
    component: <Category />,
  },
  {
    path: '/restaurants/:id',
    component: <Restaurant />,
  },
];

const ownerRoutes = [
  {
    path: '/',
    component: <MyRestaurants />,
  },
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
        {commonRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        {data.me.role === 'Client' &&
          clientRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        {data.me.role === 'Owner' &&
          ownerRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default LoggedInRouter;
