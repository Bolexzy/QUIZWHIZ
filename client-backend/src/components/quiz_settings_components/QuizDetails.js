import React from 'react';
import { Button, Flex } from '@chakra-ui/react'
import {
    Text,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import './QuizDetails.css'

const QuizDetails = ({ formValues, handleQuizDetailsChange, handleQuziDetailsFormSubmit, deleteQuiz }) => {

    return (
        <Box>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    {({ isExpanded }) => (
                        <Box >
                            <h2>
                                <AccordionButton bg='revert-layer' color='royalblue' _expanded={{ bg: 'black', opacity: 0.3, color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {isExpanded ? (
                                            <Text color={'black'}>Quiz Details</Text>
                                        ) : (
                                            <>
                                                {
                                                    // question.answer.length > 0 ? question.answer.map((letter) => <Text fontFamily='cursive' color='black'>Ans{')'}  {question.options[letter]}</Text>) : (<Text color='CaptionText' opacity='0.6'>No Option selected yet</Text>)
                                                }
                                            </>
                                        )}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} style={{width:'100%'}}>
                                <div className="header-container" style={{width:'100%'}}>
                                    <form onSubmit={handleQuziDetailsFormSubmit}>
                                        <div className="form-row">
                                            <label htmlFor="title">Title:</label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formValues.title}
                                                onChange={handleQuizDetailsChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="description">Description:</label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formValues.description}
                                                onChange={handleQuizDetailsChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="alloted_time_in_mins">Alloted Time (mins):</label>
                                            <input
                                                type="number"
                                                id="alloted_time_in_mins"
                                                name="alloted_time_in_mins"
                                                value={formValues.alloted_time_in_mins}
                                                min={1}
                                                onChange={handleQuizDetailsChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="quiz_start_datetime">Quiz Start Date/Time:</label>
                                            <input
                                                type="datetime-local"
                                                id="quiz_start_datetime"
                                                name="quiz_start_time"
                                                value={formValues.quiz_start_time}
                                                onChange={handleQuizDetailsChange}
                                            />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="quiz_end_time">Quiz End Date/Time:</label>
                                            <input
                                                type="datetime-local"
                                                id="quiz_end_datetime"
                                                name="quiz_end_time"
                                                value={formValues.quiz_end_time}
                                                onChange={handleQuizDetailsChange}
                                            />
                                        </div>
                                        <Flex>
                                            <Button colorScheme='red' onClick={deleteQuiz}>delete quiz</Button>
                                            <button type="submit">Submit</button>
                                        </Flex>
                                        
                                    </form>
                                </div>

                            </AccordionPanel>
                        </Box>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    );
};

export default QuizDetails;
