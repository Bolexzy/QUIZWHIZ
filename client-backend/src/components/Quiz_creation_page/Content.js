import React from 'react';
import Question from './Question';

const Content = ({ questions, handleQuestionChange, pull_func }) => {
  console.log(questions);
  return (
    questions &&
    questions.map(question => (
      <div className="quiz--content">
        <Question
          // isAnswerVisible={isAnswerVisible}
          // handleToggleAnswer={handleToggleAnswer}
          question={question}
          handleQuestionChange={handleQuestionChange}
          pull_func={pull_func}
        />
      </div>
    ))
  );
};

export default Content;
