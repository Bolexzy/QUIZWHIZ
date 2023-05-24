import React from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { NavLink } from "react-router-dom";


const Header = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  function logout (){
    signOut();
  }
  return (
    <header className="landing--header">
      <nav className="container">
        <div className="logo"></div>
        <ul className="links">
          <li>How it Works?</li>
          <li>Features</li>
          <li>About us</li>
          {user ? (<li onClick={logout} className="login">signOut</li>) : (<NavLink to="/login" end ><li className="login">Login</li></NavLink>)}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
