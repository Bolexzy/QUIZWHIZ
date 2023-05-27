import React from 'react';
import quizData from './quizData';
import QuizCard from './QuizCard';
import './Home.css';

const Content = () => {
  const quizElements = quizData.map(quiz => {
    return (
      <QuizCard
        title={quiz.title}
        description={quiz.description}
        score={quiz.score}
        img={quiz.img}
      />
    );
  });

  return (
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
  );
};

export default Content;
