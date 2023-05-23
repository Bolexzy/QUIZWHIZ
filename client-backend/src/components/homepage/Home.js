import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Main from './Main';
import Content from './Content'
import './Home.css';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeNav = () => {
    setIsSidebarOpen(false);
  };

  const openNav = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div>
      <Main isSidebarOpen={isSidebarOpen} openNav={openNav} />
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} closeNav={closeNav} />
      )}
      <Content />
    </div>
  );
};

export default Home;
