import React, { useState, useEffect } from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react'
import { v4 } from "uuid";
import DisplayQuestions from './DisplayQuestions';
import questions from '../../set_quiz_questions.json';
import QuizInfo from './QuizInfo';
import AIQuestionGenerator from './ai_question_generator/AIQuestionGenerator';

export default function QuizSettingPage() {
    const [quiz, setQuiz] = useState(questions);
    const [render, toggleRender] = useState(false);

    const createNewQuestionObject = () => {
        setQuiz((prevState) => [...prevState, {
            "id": v4(),
            "question": `Enter Question ${prevState.length + 1}`,
            "options": {
                "A": "enter option 1 here",
                "B": "enter option 2 here",
                "C": "enter option 3 here",
                "D": "enter option 4 here"
            },
            "answer": ["B", "D"]
        }]);
        console.log(quiz);
    }

    const removeQuestion = (questionId) => {
        setQuiz((prevState) => prevState.filter((elem) => questionId != elem.id));
    };

    const setQuestiontext = (questionId, text) => {
        setQuiz((prevState) => {
            for (let question of prevState) {
                if (question.id === questionId) {
                    question.question = text;
                    toggleRender(!render);
                    console.log(prevState)
                }
            }
            return prevState;
        });
    };

    const setOptionsText = (questionId, optionKey, text) => {
        setQuiz((prevState) => {
            for (let question of prevState) {
                if (question.id === questionId) {
                    question.options[optionKey] = text;
                    toggleRender(!render);
                    console.log(prevState)
                }
            }
            return prevState;
        });
    }

    const addOptionToCorrectAnswer = (questionId, optionKey, checked) => {
        setQuiz((prevState) => {
            for (let question of prevState) {
                if (question.id === questionId) {
                    if (checked) {
                        question.answer.push(optionKey);
                    } else {
                        const tmparr = question.answer.filter((ans) => ans != optionKey);
                        question.answer = tmparr;
                    }
                    toggleRender(!render);
                    console.log(prevState)
                }
            }
            return prevState;
        });
    }

    return (
        <>
            <Flex justifyContent="space-around">
                <Box>
                    <QuizInfo quiz={quiz} />
                    <DisplayQuestions quiz={quiz} removeQuestion={removeQuestion} setQuestiontext={setQuestiontext} setOptionsText={setOptionsText} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />
                    <Button colorScheme='blue' onClick={createNewQuestionObject}>+ Add Question</Button>
                </Box>
                <Box>
                    <AIQuestionGenerator />
                </Box>
            </Flex>
        </>
    )
}