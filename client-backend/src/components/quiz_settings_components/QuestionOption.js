import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Stack, HStack, VStack } from '@chakra-ui/react'

export default function QuestionOption({ optionLabel, optionText, questionId, setOptionsText, addOptionToCorrectAnswer, answer }) {

    return (
        <>
            <HStack spacing='10px'>
                <Checkbox isChecked={!!answer.includes(optionLabel)} value={optionLabel} onChange={(e) => addOptionToCorrectAnswer(questionId, optionLabel, e.target.checked)}></Checkbox>
                <Input
                    type="text"
                    value={optionText}
                    onChange={(event) => {
                        setOptionsText(questionId, optionLabel, event.target.value);
                    }}
                />
            </HStack>
        </>
    )
}