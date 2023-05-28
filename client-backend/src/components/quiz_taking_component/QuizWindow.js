import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import questions from '../../take_quiz_questions.json';
import Question from './Question';

export default function QuizWindow() {
  const [quiz, setQuiz] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [render, toggleRender] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? quiz.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === quiz.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToFirst = () => {
    setCurrentIndex(0);
  };

  const goToLast = () => {
    setCurrentIndex(quiz.length - 1);
  };

  const addOptionToCorrectAnswer = (questionId, optionKey, checked) => {
    setQuiz(prevState => {
      // Loop through each question in the previous state
      for (let question of prevState) {
        // Find the question with the matching ID
        if (question.id === questionId) {
          // If the question's myanswer property is null, initialize it as an empty array
          if (question.myanswer == null) {
            question.myanswer = [];
          }
          // Add or remove the option based on the checked value
          if (checked) {
            question.myanswer.push(optionKey); // Add the option to myanswer
          } else {
            const tmparr = question.myanswer.filter(ans => ans !== optionKey); // Create a new array without the option
            question.myanswer = tmparr; // Update myanswer with the new array
          }

          // Trigger a re-render by toggling the render state
          toggleRender(!render);
          console.log(prevState); // Log the updated state for debugging purposes
        }
      }
      return prevState; // Return the updated state
    });
  };

  useEffect(() => {
    console.log(questions);
  }, [quiz]);

  return (
    <div className="layout">
      <Question
        question={quiz[currentIndex]}
        questionIndex={currentIndex}
        addOptionToCorrectAnswer={addOptionToCorrectAnswer}
        total={quiz.length}
      />
      <section className="action-btns">
        <button onClick={goToFirst}>First</button>
        <button onClick={goToPrevious}>Previous</button>
        <button onClick={goToNext}>Next</button>
        <button onClick={goToLast}>Last</button>
      </section>
    </div>
  );
}
