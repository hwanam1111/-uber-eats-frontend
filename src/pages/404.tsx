import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <h2 className="">Page Not Found.</h2>
      <h4 className="">
        The page you&apos;re looking for does not exists or has moved.
      </h4>
      <Link to="/">Go back home &rarr;</Link>
    </div>
  );
}

export default NotFound;
