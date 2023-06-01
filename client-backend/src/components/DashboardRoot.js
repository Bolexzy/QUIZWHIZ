import React, { useState } from 'react';
import { Navigate,Outlet } from 'react-router-dom';
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

  if (loading){
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
  <SkeletonCircle size='10' />
  <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
</Box>
    )
  }

  if (!loading && !user){
    return (<Navigate to="/" replace={true} />)
  }

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