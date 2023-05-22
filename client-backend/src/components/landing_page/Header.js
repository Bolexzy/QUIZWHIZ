import React from 'react';

const Header = () => {
  return (
    <header className="landing--header">
      <nav className="container">
        <div className="logo"></div>
        <ul className="links">
          <li>How it Works?</li>
          <li>Features</li>
          <li>About us</li>
          <li className="login">Login</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
