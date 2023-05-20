import React from 'react';
import { Input } from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
import QuestionOptions from './QuestionOptions';

export default function OneQuestion({ question, removeQuestion, setOptionsText, setQuestiontext, addOptionToCorrectAnswer }) {
    return (
        <>
            <CloseButton onClick={() => removeQuestion(question.id)} />
            <Input
                value={question.question}
                onChange={(event) => {
                    setQuestiontext(question.id, event.target.value);
                }}
            />
            <QuestionOptions options={question.options} questionId={question.id} setOptionsText={setOptionsText} answer={question.answer} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />
        </>
    )
}