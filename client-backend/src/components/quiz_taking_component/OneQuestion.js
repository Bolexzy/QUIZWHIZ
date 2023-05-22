import React from 'react';
import { Text } from '@chakra-ui/react'
import QuestionOptions from './QuestionOptions';

export default function OneQuestion({ question, questionIndex, addOptionToCorrectAnswer }) {
    return (
        <>
            <Text fontSize='xl'>Question{questionIndex+1}: {question.question}</Text>
            <QuestionOptions options={question.options} questionId={question.id} myanswer={question.myanswer == null ? [] : question.myanswer } addOptionToCorrectAnswer={addOptionToCorrectAnswer} />
        </>
    )
}