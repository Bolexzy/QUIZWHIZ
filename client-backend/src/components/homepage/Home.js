import React, { useState, useEffect } from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import {
  Text,
  Select,
  Flex,
  Stack,
  Skeleton,
  Box,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizResultCard from './QuizResultCard';
import './Home.css';

//stan import
import SetQuizCard from './SetQuizCard';
import { Link } from 'react-router-dom';

const filterFunctions = {
  name: (fisrtItem, secondItem) => {
    return fisrtItem.user_name - secondItem.user_name;
  },
  date: (fisrtItem, secondItem) => {
    return secondItem.date_taken - fisrtItem.date_taken;
  },
  score: (fisrtItem, secondItem) => {
    return (
      (secondItem.right_answers / fisrtItem.total_questions) * 100 -
      (fisrtItem.right_answers / fisrtItem.total_questions) * 100
    );
  },
};

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

const Content = () => {
  const [questionsSet, setQuestionsSet] = useState([]);
  const [quizTaken, setQuizTaken] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const [loadingYourQuizzes, setLoadingYourQuizzes] = useState(true);
  const [loadingYourResult, setLoadingYourResult] = useState(true);

  function sortResult(e) {
    const sortFunction = filterFunctions[e.target.value];
    setQuizTaken(prevState => {
      let newresult = JSON.parse(JSON.stringify(prevState));
      newresult.sort(sortFunction);
      return newresult;
    });
  }

  useEffect(() => {
    if (user) {
      user.getIdToken().then(token => {
        fetch(`${REACT_APP_HOSTB}/user/quiz/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            res.json().then(result => {
              if (Array.isArray(result)) {
                setQuestionsSet(result);
                setLoadingYourQuizzes(false);
              }
            });
          })
          .catch(err => {
            alert(
              'an error occurred while loading your quizzes. Please try again'
            );
          });

        fetch(`${REACT_APP_HOSTB}/result/${user.uid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            res.json().then(results => {
              if (Array.isArray(results)) {
                setQuizTaken(results);
                setLoadingYourResult(false);
              }
            });
          })
          .catch(err => {
            alert(
              'an error occurred while loading your answers. Please try again'
            );
          });
      });
    }
  }, [user]);

  // bolexy
  const quizResultElements = quizTaken.map((quizResult, index) => {
    return <QuizResultCard key={quizResult.date_taken} result={quizResult} />;
  });

  //Stan
  const setQuizElements = questionsSet.map((quiz, index) => {
    return <SetQuizCard key={quiz.test_id} quiz={quiz} img={quiz.img} />;
  });

  if (loading) {
    return (
      <Box
        padding="6"
        boxShadow="lg"
        bg="white"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  return (
    <div className="container home-wrapper">
      <div className="home--content container ">
        <h2>My Quizzes</h2>
        <p>These are the quiz you have set. Click to edit</p>
        {loadingYourQuizzes ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <div
            className="d-flex align-items-stretch flex-wrap justify-content-evenly  flex-sm-row"
            // style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {questionsSet.length > 0 ? (
              setQuizElements
            ) : (
              <div>Nothing here</div>
            )}
          </div>
        )}
      </div>

      <div className="home--content">
        <h2>My Quizzes</h2>
        <p>These are the Quizzes you have taken</p>
        {loadingYourResult ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <div
            className="d-flex align-items-stretch flex-wrap justify-content-evenly  flex-sm-row"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {quizResultElements.length > 0 ? (
              <Flex style={{ flexDirection: 'column' }}>
                <Text>Sort by</Text>
                <Select
                  mb="30px"
                  placeholder="Select option"
                  maxW="15rem"
                  onChange={sortResult}
                >
                  {/* <option value='name'>name</option> */}
                  <option value="score">score</option>
                  <option value="date">date</option>
                </Select>
                <Flex
                  style={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
                >
                  {quizResultElements}
                </Flex>
              </Flex>
            ) : (
              <div>Nothing here</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
