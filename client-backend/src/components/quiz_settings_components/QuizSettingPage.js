import React, { useState, useRef } from 'react';
import { Button, Flex, Box, Text } from '@chakra-ui/react';
import { v4 } from "uuid";
import { useParams } from 'react-router-dom';
import { auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';
import DisplayQuestions from './DisplayQuestions';
import questions from '../../set_quiz_questions.json';
import QuizDetails from './QuizDetails';
import AIQuestionGenerator from './ai_question_generator/AIQuestionGenerator';

const axios = require('axios');


export default function QuizSettingPage() {
    const [user, loading, error] = useAuthState(auth);
    const [quiz, setQuiz] = useState(questions);
    const [toggleCloseAll, setToggleCloseAll] = useState(true);
    const [render, toggleRender] = useState(false);
    const addButton = useRef();
    const closeOptionsRef = useRef([]);

    //for getting url parameters
    const params = useParams();

    //quizId
    const quizId = params.quizId;
    console.log('quizid: ')
    console.log(quizId)



    //Manage QuizDetails Component State
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        alloted_time_in_mins: '',
        quiz_start_time: '',
        quiz_end_time: ''
    });

    const handleQuizDetailsChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
        console.log('form values')
        console.log(formValues);
    };

    const handleQuziDetailsFormSubmit = (e) => {
        e.preventDefault();

        console.log('userid: ', user.uid);
        let constantQuizData = {
            "test_id": quizId ?? v4(),
            "user_id": user.uid,
        }

        let quizData = { ...constantQuizData, ...formValues };

        quizData.questions = quiz;

        console.log('quiz data to sned:', quizData);
        console.log('submit')

        axios.post('https://quizwhiz.onrender.com', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
    };



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
            "answer": []
        }]);
        addButton.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }

    const extendQuizArray = (questionsArray) => {
        setQuiz((prevState) => [...prevState, ...questionsArray]);

        setTimeout(() => { addButton.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' }) }, 1000)
    }

    const appendQuestionToQuiz = (questionObject) => {
        setQuiz((prevState) => [...prevState, questionObject]);
        setTimeout(() => { addButton.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' }) }, 1000)
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
                }
            }
            return prevState;
        });
    }


    const toggleCloseAllOption = () => {
        if (toggleCloseAll) {
            closeAllOptions();
            setToggleCloseAll(!toggleCloseAll)
        } else {
            OpenAllOptions();
            setToggleCloseAll(!toggleCloseAll)
        }
    }

    const closeAllOptions = () => {
        const length = quiz.length - 1;

        for (let i = 0; i <= length; i++) {
            if (closeOptionsRef.current[i].getAttribute('aria-expanded') == 'true') {
                closeOptionsRef.current[i].click()
            }
        }
    }

    const OpenAllOptions = () => {
        const length = quiz.length - 1;

        for (let i = 0; i <= length; i++) {
            if (closeOptionsRef.current[i].getAttribute('aria-expanded') == 'false') {
                closeOptionsRef.current[i].click()
            }
        }
    }

    return (
        <Box maxW='85vw' p='3px' boxSizing='boarder-box' pos='relative' mr='auto' ml='auto'>
            {console.log('quiz: ', quiz)}
            {console.log('user:', user)}
            <Box>
                <QuizDetails formValues={formValues} handleQuizDetailsChange={handleQuizDetailsChange} handleQuziDetailsFormSubmit={handleQuziDetailsFormSubmit} />
            </Box>
            <Flex justifyContent="space-around" h='100%'>
                <Box flex='3' position='relative'>
                    <Box w='70%' overflowY='auto' p='15px' pt='30px' ml='70px' bg='white' borderRadius='20px' boxShadow='dark-lg'>
                        <Text fontSize='2xl' fontWeight='bold'>Questions: {quiz.length}</Text>
                        {
                            <Button w='100%' mb='15px' colorScheme='facebook' onClick={toggleCloseAllOption}>Toggle Close/Open All Options</Button>
                        }
                        <DisplayQuestions quiz={quiz} removeQuestion={removeQuestion} setQuestiontext={setQuestiontext} setOptionsText={setOptionsText} addOptionToCorrectAnswer={addOptionToCorrectAnswer} closeOptionsRef={closeOptionsRef} />
                        <Button ref={addButton} w='100%' mt='15px' colorScheme='facebook' onClick={createNewQuestionObject}>+ Add Question</Button>
                    </Box>
                </Box>
                <Box flex='1'>
                    <Box mt='20px'>
                        <AIQuestionGenerator extendQuizArray={extendQuizArray} appendQuestionToQuiz={appendQuestionToQuiz} />
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}