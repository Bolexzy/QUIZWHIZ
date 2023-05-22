import React from 'react';
import Header from './Header';
import Main from './Main';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <hr></hr>
      <Main />
      <footer></footer>
    </div>
  );
};

export default LandingPage;
