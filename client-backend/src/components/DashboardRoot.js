import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './dashboard_navigation/Sidebar';
import Main from './dashboard_navigation/Main';
import './DashboardRoot.css';

const DashboardRoot = () => {
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
      <Outlet />
    </div>
  );
};

export default DashboardRoot;