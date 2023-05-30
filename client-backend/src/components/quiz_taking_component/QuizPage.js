import React, { useEffect } from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { Navigate } from "react-router-dom";
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizWindow from './QuizWindow';
import './QuizPage.css';

export default function QuizTakingPage() {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {

    }
  }, [user]);

  if (loading) {
    console.log(user)
    console.log(error)
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={20} spacing='4' skeletonHeight='2' />
      </Box>
    )
  }

  if (error) {
    console.log(user)
    console.log(error)
    return (<Navigate to="/login" />)
  }

  return (
    <div className="quiz-page-container">
      <QuizWindow />
    </div>
  );
}
