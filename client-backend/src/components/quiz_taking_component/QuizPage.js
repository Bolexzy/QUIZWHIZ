import React from 'react';
import { Box } from '@chakra-ui/react';
import QuizWindow from './QuizWindow';
import './QuizPage.css';

export default function QuizTakingPage() {
  return (
    <div className="quiz-page-container">
      <QuizWindow />
    </div>
  );
}
