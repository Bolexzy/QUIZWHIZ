import React from 'react';
import { Text } from '@chakra-ui/react';
import Options from './Options';

export default function Question({
  question,
  questionIndex,
  addOptionToCorrectAnswer,
  total,
}) {
  return (
    <section className='quiz--card'>
      <div fontSize="xl" className="question--card">
        <p style={{ fontWeight: '500' }}>
          Quiz Question {questionIndex + 1} of {total}
        </p>
        <h1 style={{ fontWeight: 'bold' }}>{question.question}</h1>
        <p style={{ color: '#848687' }}>Choose the correct answer below:</p>
      </div>

      <Options
        options={question.options}
        questionId={question.id}
        myanswer={question.myanswer == null ? [] : question.myanswer}
        addOptionToCorrectAnswer={addOptionToCorrectAnswer}
      />
    </section>
  );
}
