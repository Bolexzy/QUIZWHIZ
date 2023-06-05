import React, { useState, useRef } from 'react';
import {
    Text,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { v4 } from "uuid";
import './AIQuestionGenerator.css';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_APIKEY,
});
const openai = new OpenAIApi(configuration);


const AIQuestionGenerator = ({ extendQuizArray, appendQuestionToQuiz }) => {

    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [numOfQuizzes, setNumOfQuizzes] = useState(1);
    const [level, setLevel] = useState('');

    const buttonRef = useRef([]);


    const [question, setQuestion] = useState('');
    const submitSecondForm = async (e) => {
        disableAllAIButton();
        e.preventDefault();


        console.log(question);
        let prompt = AIGenerateSingleQuestion(question);

        let completion;
        try {
            completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 500,
            });
        } catch (error) {
            console.log('openAI API ran into an error')
            console.log(error)
            enableAllAIButton()
        }


        const AIdata = completion.data.choices[0].text;
        console.log(AIdata)
        try {
            let questionObject = JSON.parse(AIdata)
            addOIdToQuestionObject(questionObject);
            appendQuestionToQuiz(questionObject);

            console.log(questionObject)
            enableAllAIButton()
        } catch (error) {
            enableAllAIButton()
            console.log('not a valid json')
        }



        // Clear input field if query was successful
        setQuestion('');
    };

    function AIGenerateSingleQuestion(question) {
        let prompt =
            `You are a json quiz api that returns only one object. create a quiz on this question: ${question}. Return the options together with the right answer using this format:
        {
            "question": "${question}",
            "options": {
            "A": "option 1",
            "B": "option 2",
            "C": "option 3",
            "D": "option 4"
            },
            "answer": [an array of the right answers]
        }
        do not add any text or explanation at the beginning or end of the json object. just return only the json object.`;
        return prompt;
    }

    function disableAllAIButton() {
        for (let i = 0; i < 2; i++) {
            buttonRef.current[i].disabled = true;
        }
    }

    function enableAllAIButton() {
        for (let i = 0; i < 2; i++) {
            buttonRef.current[i].disabled = false;
        }
    }

    const handleSubmit = async (e) => {
        disableAllAIButton();
        e.preventDefault();

        const prompt = generateAIPrompt(subject, topic, numOfQuizzes, level);
        let completion;
        try {
            completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 500,
            });
        } catch (error) {
            console.log('openAI API ran into an error')
            console.log(error)
            enableAllAIButton()
        }


        const AIdata = completion.data.choices[0].text;

        try {
            let questionArray = JSON.parse(AIdata)
            addIdToQuestions(questionArray);
            extendQuizArray(questionArray);
            enableAllAIButton()
        } catch (error) {
            enableAllAIButton()
            console.log('not a valid json')
        }
    };

    function addOIdToQuestionObject(question) {
        question.id = v4();
    }

    function addIdToQuestions(questionArray) {
        questionArray.forEach(question => {
            question.id = v4();
        });
    }



    function generateAIPrompt(subject, topic, numOfQuizzes, level) {
        let prompt =
            `You are a json quiz api that returns an array of objects. i want you to create ${numOfQuizzes} quizzes on ${subject} ${topic ? 'under the topic' : ''} ${topic}. ${level ? 'The questions should be at a' : ''} ${level} ${level ? 'level' : ''}. Return the questions, options and the right answers using the following format:
                [
                    {
                    "question": "Question goes here",
                    "options": {
                    "A": "option 1",
                    "B": "option 2",
                    "C": "option 3",
                    "D": "option 4"
                    },
                    "answer": [an array of the right answers]
                },
                {
                    "question": "Question goes here",
                    "options": {
                    "A": "option 1",
                    "B": "option 2",
                    "C": "option 3",
                    "D": "option 4"
                    },
                    "answer": [an array of the right answers]
                }
            ]
            do not add any text or explanation at the beginning or end of the json array. just return only the json array.`;
        return prompt;
    }

    return (
        <Box>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    {({ isExpanded }) => (
                        <Box >
                            <h2>
                                <AccordionButton boxShadow='2xl' style={{ padding: '20px' }} _expanded={{ bg: '#dadde6', color: 'black' }}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        <Text fontSize='large' fontWeight='bold'>Generate Quiz With AI</Text>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Box>
                                    <form className="quiz-form" onSubmit={handleSubmit}>
                                        <Text mb='20px' fontWeight='bold'>Generate Quizzes based on a particular topic and difficulty level: </Text>
                                        <div className="form-group">
                                            <label htmlFor="subject">Subject: (Required)</label>
                                            <input
                                                required
                                                type="text"
                                                id="subject"
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="topic">Topic: (Optional)</label>
                                            <input
                                                type="text"
                                                id="topic"
                                                value={topic}
                                                onChange={(e) => setTopic(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="numOfQuizzes">Number of Quizzes: (Required)</label>
                                            <input
                                                type="number"
                                                id="numOfQuizzes"
                                                value={numOfQuizzes}
                                                min={1} max={4}
                                                onChange={(e) => setNumOfQuizzes(parseInt(e.target.value))}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="level">Level: (Optional)</label>
                                            <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
                                                <option value="">No Level selected</option>
                                                <option value="Nursery education">Nursery education</option>
                                                <option value="Primary education">Primary education</option>
                                                <option value="Lower secondary education">Lower secondary education</option>
                                                <option value="Upper secondary education">Upper secondary education</option>
                                                <option value="Bachelor degree education">Bachelor degree education</option>
                                                <option value="Masters degree education">Masters degree education</option>
                                                <option value="Doctorate degree education">Doctorate degree education</option>
                                            </select>
                                        </div>

                                        <button ref={(el) => (buttonRef.current[0] = el)} id="AISubButton" className='stanAIbutton' type="submit">
                                            Generate Questions
                                            <div style={{ position: 'absolute' }} className="loader">
                                            </div>
                                        </button>
                                    </form>
                                </Box>
                                <Box mt='20px'>
                                    <form className="simple-form" onSubmit={submitSecondForm}>
                                        <div className="form-group">
                                            <textarea
                                                style={{ height: '150px' }}
                                                id='oneapiinput'
                                                type="text"
                                                value={question}
                                                onChange={(e) => setQuestion(e.target.value)}
                                                placeholder="Enter your text (leave empty to generate a random question)"
                                            />
                                        </div>

                                        <button ref={(el) => (buttonRef.current[1] = el)} id='AISubButton' className='stanAIbutton' type="submit">
                                            Submit
                                            <div style={{ position: 'absolute' }} className="loader">
                                            </div>
                                        </button>
                                    </form>
                                </Box>
                            </AccordionPanel>
                        </Box>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default AIQuestionGenerator;
