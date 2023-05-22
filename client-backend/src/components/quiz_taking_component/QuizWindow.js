import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import questions from '../../take_quiz_questions.json';
import OneQuestion from './OneQuestion';

export default function QuizWindow() {
    const [quiz, setQuiz] = useState(questions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [render, toggleRender] = useState(false);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? quiz.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === quiz.length - 1 ? 0 : prevIndex + 1));
    };

    const goToFirst = () => {
        setCurrentIndex(0);
    };

    const goToLast = () => {
        setCurrentIndex(quiz.length - 1);
    };

    const addOptionToCorrectAnswer = (questionId, optionKey, checked) => {
        setQuiz((prevState) => {
            for (let question of prevState) {
                if (question.id === questionId) {
                    if (question.myanswer == null) {
                        question.myanswer = []
                    }
                    if (checked) {
                        question.myanswer.push(optionKey);
                    } else {
                        const tmparr = question.myanswer.filter((ans) => ans != optionKey);
                        question.myanswer = tmparr;
                    }
                    toggleRender(!render);
                    console.log(prevState)
                }
            }
            return prevState;
        });
    }

    useEffect(() => {
        console.log(questions)
    },[quiz]);
    return (
        <Box>
            <OneQuestion question={quiz[currentIndex]} questionIndex={currentIndex} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />
            <Button onClick={goToFirst}>First</Button>
            <Button onClick={goToPrevious}>Previous</Button>
            <Button onClick={goToNext}>Next</Button>
            <Button onClick={goToLast}>Last</Button>
        </Box>
    );
};
