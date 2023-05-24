import React from 'react';
import { Switch } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react';
import { HStack, Box } from '@chakra-ui/react'

export default function QuestionOption({ optionLabel, optionText, questionId, setOptionsText, addOptionToCorrectAnswer, answer }) {

    

    return (
        <Box bgGradient='linear(to-l, #e0e0e0, #ddf9c1)' borderRadius='15px' padding='10px'
           >
            <HStack spacing='10px'>
                <Switch colorScheme='teal' size='md' isChecked={!!answer.includes(optionLabel)} value={optionLabel} onChange={(e) => addOptionToCorrectAnswer(questionId, optionLabel, e.target.checked)}>
                </Switch>
                <Input
                    style={{ border: '0px', outLine: '0px' }}
                    _focus={{ borderBottom: '1px', outline: '0px' }}
                    _hover={{
                        background: "white",
                        color: "teal.500",
                        outlineBottom: '1px red',
                      }}
                    type="text"
                    value={optionText}
                    onChange={(event) => {
                        setOptionsText(questionId, optionLabel, event.target.value);
                    }}
                />
            </HStack>
        </Box>
    )
}