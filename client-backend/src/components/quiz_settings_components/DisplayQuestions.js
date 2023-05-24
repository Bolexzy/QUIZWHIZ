import React from 'react';
import { Box } from '@chakra-ui/react';
import OneQuestion from './OneQuestion';

export default function DisplayQuestions({quiz, removeQuestion, setQuestiontext, setOptionsText, addOptionToCorrectAnswer, closeOptionsRef}){

    return(
        <Box>
    {quiz.map((elem, id)=><OneQuestion key={elem.id} question={elem} removeQuestion={removeQuestion} setQuestiontext={setQuestiontext} setOptionsText={setOptionsText} addOptionToCorrectAnswer={addOptionToCorrectAnswer} closeOptionsRef={closeOptionsRef} refKey={id} />)}
        </Box>
    )
}