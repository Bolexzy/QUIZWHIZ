import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { FirebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import Sidebar from './dashboard_navigation/Sidebar';
import Main from './dashboard_navigation/Main';
import './DashboardRoot.css';
import { useRadio } from '@chakra-ui/react';

const DashboardRoot = () => {

  const [user, loading, error] = useAuthState(auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeNav = () => {
    setIsSidebarOpen(false);
  };

  const openNav = () => {
    setIsSidebarOpen(true);
  };

  if (loading) {
    return (
      <Box padding='6' boxShadow='lg' bg='white' style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    )
  }

  if (!loading && !user) {
    return (<Navigate to="/" replace={true} />)
  }

  return (
    <div style={{ padding: '20px' }}>
      <Main isSidebarOpen={isSidebarOpen} openNav={openNav} />
      {isSidebarOpen && (
        <Sidebar isSidebarOpen={isSidebarOpen} closeNav={closeNav} />
      )}
      <div style={{ padding: '20px', width: '100%', minWidth: '240px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardRoot;