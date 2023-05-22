import React from 'react';
import { Checkbox } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react'

export default function QuestionOption({ optionLabel, optionText, questionId, addOptionToCorrectAnswer, myanswer }) {

    return (
        <>
            <HStack spacing='10px'>
                <Text>{optionLabel}</Text>
                <Checkbox isChecked={!!myanswer.includes(optionLabel)} value={optionLabel} onChange={(e) => addOptionToCorrectAnswer(questionId, optionLabel, e.target.checked)}></Checkbox>
                <Text>{optionText}</Text>
            </HStack>
        </>
    )
}