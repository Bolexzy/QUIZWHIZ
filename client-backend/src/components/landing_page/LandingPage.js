import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div
      className="landing-page d-flex flex-column align-items-center w-100 bg-image"
      style={{ height: '100vh' }}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default LandingPage;
