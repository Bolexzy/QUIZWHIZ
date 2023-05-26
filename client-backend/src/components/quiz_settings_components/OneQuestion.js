import React from 'react';
import { Input, Box, Text } from '@chakra-ui/react'
import { IconButton } from '@chakra-ui/react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'
import { VscChromeClose } from "react-icons/vsc";
import QuestionOptions from './QuestionOptions';



export default function OneQuestion({ question, removeQuestion, setOptionsText, setQuestiontext, addOptionToCorrectAnswer, closeOptionsRef, refKey }) {
    return (
        <Box bgGradient='linear(to-l, #e0e0e0, #ddf9c1)' mt='10px' borderRadius='10px'>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', right: '2px', display: 'inline-block', marginRight: "6px", marginTop: '6px' }}>
                    <IconButton
                        size='sm'
                        borderRadius='50%'
                        onClick={() => removeQuestion(question.id)}
                        ml='auto'
                        colorScheme='red'
                        aria-label='Search database'
                        icon={<VscChromeClose />}
                    />
                </div>
            </div>
            <Box>
                <Input
                    w='90%'
                    value={question.question.slice(0,14) != 'Enter Question' ? question.question :''}
                    placeholder={question.question}
                    onChange={(event) => {
                        setQuestiontext(question.id, event.target.value);
                    }}
                />
            </Box>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                    {({ isExpanded }) => (
                        <Box >
                            <h2>
                                <AccordionButton ref={(el)=>(closeOptionsRef.current[refKey] = el)} _expanded={{ bg: 'black', opacity: 0.3, color: 'white' }}>
                                    <Box as="span" flex='1' textAlign='left'>
                                        {isExpanded ? (
                                            <Text>Select Options</Text>
                                        ) : (
                                            <>
                                                {
                                                    question.answer.length > 0 ? question.answer.map((letter) => <Text fontFamily='cursive' color='black'>Ans{')'}  {question.options[letter]}</Text>): (<Text color='CaptionText' opacity='0.6'>No Option selected yet</Text>)
                                                }
                                            </>
                                        )}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <QuestionOptions options={question.options} questionId={question.id} setOptionsText={setOptionsText} answer={question.answer} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />

                            </AccordionPanel>
                        </Box>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    )
}