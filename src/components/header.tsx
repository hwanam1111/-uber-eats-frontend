import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import useMe from '../hooks/useMe';
import logo from '../images/logo.svg';

function Header() {
  const { data } = useMe();

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-400 p-3 text-center text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="px-5 lg:px-16 mx-auto flex justify-between items-center">
          <img src={logo} alt="logo" className="w-36" />
          <span className="text-ws">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
