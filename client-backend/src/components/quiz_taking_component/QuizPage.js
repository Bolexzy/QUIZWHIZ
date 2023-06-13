import React, { useState, useEffect, useRef } from 'react';
import { Flex, Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizInfo from './QuizInfo';
import QuizWindow from './QuizWindow';
import './QuizPage.css';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

export default function QuizTakingPage() {
  const [user, loading, error] = useAuthState(auth);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});
  const [loadingQuizInfo, setLoadingQuizInfo] = useState(true);

  const [startQuiz, setStartQuiz] = useState(false);
  const [quizObject, setQuizObject] = useState({});
  let quizArrayRef = useRef([]);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const navigate = useNavigate();

  let { quizId } = useParams();

  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const handleStartQuiz = () => {
    user.getIdToken().then(token => {
      fetch(`${REACT_APP_HOSTB}/taketest/${quizId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          res.json().then(res => {
            console.log(res);
            if (!res?.message) {
              setStartQuiz(true);
              setQuizObject(res);

              setStartTime(Date.now());
              setEndTime(res.allotted_time_in_mins * 60 * 1000 + Date.now());
            } else {
              alert(res.message);
            }
          });
        })
        .catch(() => {
          alert('failed to get quiz. please try again');
        });
    });
  };

  useEffect(() => {
    if (!loading) {
      if (user === null) {
        setShouldRedirect(true);
      } else {
        //user is logged in
        user.getIdToken().then(token => {
          fetch(`${REACT_APP_HOSTB}/quizinfo/${quizId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then(res => {
              res.json().then(QuizDetail => {
                setLoadingQuizInfo(false);
                setQuizInfo(QuizDetail);
              });
            })
            .catch(() => {
              alert('failed to load quiz information. please try again');
            });
        });
      }
    }
  }, [user, loading, quizId]);

  const submitAttempts = useRef(0);

  const submitQuiz = () => {
    setSubmittingQuiz(true);
    let quiztoSubmit = quizObject;
    quiztoSubmit.questions = quizArrayRef.current;
    console.log(quiztoSubmit);
    user.getIdToken().then(token => {
      fetch(`${REACT_APP_HOSTB}/submit/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quiztoSubmit),
      })
        .then(res => {
          res.text().then(res => {
            console.log(res);
            navigate('/dashboard', { replace: true });
          });
        })
        .catch(() => {
          if (submitAttempts.current < 1000) {
            setTimeout(submitQuiz(), 10000);
            submitAttempts.current++;
          }
        });
    });
  };

  const updateQuizQuestionsarray = quizQuestions => {
    quizArrayRef.current = quizQuestions;
  };

  if (loading || loadingQuizInfo) {
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
        <SkeletonText mt="4" noOfLines={20} spacing="4" skeletonHeight="2" />
      </Box>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  if (!startQuiz) {
    return (
      <div className="container quiz-container mt-5">
        <h1 className="quiz-title">{quizInfo.title}</h1>
        <p className="quiz-description">{quizInfo.description}</p>
        {quizInfo.quiz_start_time ? (
          <div>
            <p className="quiz-time">
              Start Date:{' '}
              {new Date(quizInfo.quiz_start_time + 3600000).toString()}
            </p>
            <p className="quiz-time">
              Stop Date: {new Date(quizInfo.quiz_end_time + 3600000).toString()}
            </p>
          </div>
        ) : (
          <div />
        )}
        <p className="quiz-time">
          Allotted Time: {quizInfo.allotted_time_in_mins} minutes
        </p>
        <div>
          NOTE: Do not click outside of the browser Window, refresh or leave the
          page or the quiz will be submitted automatically
        </div>
        <button className="start-quiz-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  if (submittingQuiz) {
    return <Box>Submitting Quiz...</Box>;
  }

  return (
    <div
      style={{ minWidth: '400px' }}
      className="quiz-page-container mt-5 mb-5 p-2"
    >
      <QuizInfo
        startTime={startTime}
        endTime={endTime}
        submitQuiz={submitQuiz}
      />
      <QuizWindow
        questions={quizObject.questions}
        updateQuizQuestionsarray={updateQuizQuestionsarray}
      />
    </div>
  );
}
