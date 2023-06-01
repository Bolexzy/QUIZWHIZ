import React, { useState, useEffect } from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { Stack, Skeleton, Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizResultCard from './QuizResultCard';
import './Home.css';

//stan import
import SetQuizCard from './SetQuizCard'
import { Link } from 'react-router-dom';


const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

const Content = () => {
  const [questionsSet, setQuestionsSet] = useState([]);
  const [quizTaken, setQuizTaken] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const [loadingYourQuizzes, setLoadingYourQuizzes] = useState(true);
  const [loadingYourResult, setLoadingYourResult] = useState(true);


  useEffect(() => {
    if (user) {
      console.log(user)
      user.getIdToken().then((token) => {
        fetch(`${REACT_APP_HOSTB}/user/quiz/${user.uid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        }).then((res) => {
          res.text().then((text) => {
            setQuestionsSet(JSON.parse(text))
            setLoadingYourQuizzes(false);
          });
        }).catch((err) => {
          alert('an error occurred while loading your quizzes. Please try again')
        });

        fetch(`${REACT_APP_HOSTB}/result/${user.uid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          },
        }).then((res) => {
          res.text().then((text) => {
            setQuizTaken(JSON.parse(text))
            setLoadingYourResult(false)
          });
        }).catch((err) => {
          alert('an error occurred while loading your answers. Please try again')
        });


      });
    }
  }, [user])


  // bolexy
  const quizResultElements = quizTaken.map((quizResult, index) => {
    return (
      <QuizResultCard
        key={quizResult.date_taken}
        result={quizResult}
      />
    );
  });

  //Stan
  const setQuizElements = questionsSet.map((quiz, index) => {
    return (
      <SetQuizCard
        key={quiz.test_id}
        quiz={quiz}
        img={quiz.img}
      />
    );
  });


  if (loading) {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    )
  }

  return (
    <div>
      <div className="home--content">
        <h2>My Quizzes</h2>
        <p>
          These are the quiz you have set. Click to edit
        </p>
        {loadingYourQuizzes ?
          (<Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>) :
          (<div className="quiz--cards" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {questionsSet.length > 0 ? setQuizElements : <div>Nothing here</div>}
          </div>)
        }

      </div>


      <div className="home--content">
        <h2>My Quizzes</h2>
        <p>
          These are the Quizzes you have taken
        </p>
        {loadingYourResult ? (
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        ) : (
          <div className="quiz--cards" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {quizResultElements.length > 0 ? quizResultElements : <div>Nothing here</div>}
          </div>
        )
        }

      </div>
    </div>
  );
};

export default Content;
