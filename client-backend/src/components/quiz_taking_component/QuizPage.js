import React, { useState, useEffect, useRef } from 'react';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Navigate, useNavigate } from "react-router-dom";
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import QuizInfo from './QuizInfo'
import QuizWindow from './QuizWindow';
import './QuizPage.css';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

export default function QuizTakingPage() {
  const [user, loading, error] = useAuthState(auth);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [quizInfo, setQuizInfo] = useState({});

  const [startQuiz, setStartQuiz] = useState(false);
  const [quizObject, setQuizObject] = useState({});
  let quizArrayRef = useRef([])
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const navigate = useNavigate();

  let { quizId } = useParams();


  const handleStartQuiz = () => {
    user.getIdToken().then((token) => {
      fetch(`${REACT_APP_HOSTB}/taketest/${quizId}`, {
        method:'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        res.json().then((res) => {
          console.log(res)
          setStartQuiz(true)
          setQuizObject(res)

          setStartTime(Date.now());
          setEndTime((res.allotted_time_in_mins * 60 * 1000) + Date.now());
        })
      });
    });
  };



  useEffect(() => {
    if (!loading) {
      if (user === null) {
        setShouldRedirect(true)
      } else {
        //user is logged in
        user.getIdToken()
          .then((token) => {
            fetch(`${REACT_APP_HOSTB}/quizinfo/${quizId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((res) => {
              res.json()
                .then((QuizDetail) => {
                  setQuizInfo(QuizDetail)
                })
            });
          });
      }
    }
  }, [user, loading, quizId]);


  const submitQuiz = ()=>{
    let quiztoSubmit = quizObject;
    quiztoSubmit.questions =  quizArrayRef.current;
    console.log(quiztoSubmit)
    user.getIdToken().then((token) => {
      fetch(`${REACT_APP_HOSTB}/submit/${quizId}`, {
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(quiztoSubmit),
      }).then((res) => {
        res.text().then((res) => {
          console.log(res)
          navigate('/dashboard', {replace: true})
        })
      });
    });
  }

  const updateQuizQuestionsarray =(quizQuestions)=>{
    quizArrayRef.current = quizQuestions;
  }

  

  if (loading) {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={20} spacing='4' skeletonHeight='2' />
      </Box>
    )
  }

  if (shouldRedirect) {
    return (<Navigate to="/login" />)
  }

  if (!startQuiz) {
    return (
      <div className="quiz-container">
        <h1 className="quiz-title">{quizInfo.title}</h1>
        <p className="quiz-description">{quizInfo.description}</p>
        {quizInfo.quiz_start_time ?
          (<div>
            <p className="quiz-time">Start Date: {new Date(quizInfo.quiz_start_time + 3600000).toString()}</p>
            <p className="quiz-time">Stop Date: {new Date(quizInfo.quiz_end_time + 3600000).toString()}</p>
          </div>)
          :
          (<div />)
        }
        <p className="quiz-time">Allotted Time: {quizInfo.allotted_time_in_mins} minutes</p>
        <div>
          NOTE: Do not click outside of the browser Window, refresh or leave the page or the quiz will be submitted automatically
        </div>
        <button className="start-quiz-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page-container">
      <QuizInfo startTime={startTime} endTime={endTime} submitQuiz={submitQuiz} />
      <QuizWindow questions={quizObject.questions} updateQuizQuestionsarray={updateQuizQuestionsarray}/>
    </div>
  );
}
