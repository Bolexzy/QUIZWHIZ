import React from 'react';
import OneQuestion from './OneQuestion';

export default function DisplayQuestions({quiz, removeQuestion, setQuestiontext, setOptionsText, addOptionToCorrectAnswer}){

    return(
        <>
    {quiz.map((elem, id)=><OneQuestion key={elem.id} question={elem} removeQuestion={removeQuestion} setQuestiontext={setQuestiontext} setOptionsText={setOptionsText} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />)}
        </>
    )
}