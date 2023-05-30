import React, { useState,useEffect } from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import quizData from './quizData';
import QuizCard from './QuizCard';
import './Home.css';

//stan import
import SetQuizCard  from './SetQuizCard'


const HOSTB = process.env.HOST || 'http://localhost:4000';

const Content = () => {
  const [questionsSet, setQuestionsSet ] = useState([])
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      fetch(`${HOSTB}/user/quiz/${user.uid}`, {
        method: 'GET',
      }).then((res) => {
        res.text().then((text) => { setQuestionsSet(JSON.parse(text)) });
      }).catch((err) => {
        console.log(err);
      });
      console.log(user);
    }
  }, [user])


// bolexy
  const quizElements = quizData.map((quiz, index) => {
    return (
      <QuizCard
        key={index}
        title={quiz.title}
        description={quiz.description}
        score={quiz.score}
        img={quiz.img}
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

  return (
    <div>
      {console.log(questionsSet)}
      {/* stan */}
      <div className="home--content">
        <h2>My Quizzes</h2>
        <p>
          These are the quiz you have set. Click to edit
        </p>
        <div className="quiz--cards" style={{display:'flex', flexWrap:'wrap'}}>
          {questionsSet.length > 0? setQuizElements: <div>Nothing here</div>}
          </div>
      </div>

      {/* bolexy */}
      <div className="home--content">
        <h2>My Quizzes</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sunt
          aliquam distinctio architecto facere, illo consectetur minus labore
          facilis adipisci quo ea nemo quis itaque. Alias ratione laboriosam unde
          doloribus?
        </p>
        <div className="quiz--cards">{quizElements}</div>
      </div>
    </div>
  );
};

export default Content;
