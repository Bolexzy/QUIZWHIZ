import React, { useState } from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [isActive, setActive] = useState(false);

  function logout() {
    signOut();
  }

  const toggleActive = () => {
    setActive(!isActive);
  };

  return (
    <header className="landing--header">
      <nav className="container">
        <a href="#" className="logo"></a>
        <ul className={`links ${isActive ? 'active' : ''}`}>
          <li>How it Works?</li>
          <li>Features</li>
          <li>About us</li>
          {user ? (
            <li onClick={logout} className="login">
              signOut
            </li>
          ) : (
            <NavLink to="/login" end>
              <li className="login">Login</li>
            </NavLink>
          )}
        </ul>
        <div
          className={`hamburger ${isActive ? 'active' : ''}`}
          onClick={toggleActive}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
