import React from 'react';
import { Stack } from '@chakra-ui/react'
import QuestionOption from './QuestionOption';

export default function QuestionOptions({ questionId, options, addOptionToCorrectAnswer, myanswer }) {

    function showOptions(options) {
        let arr = [];
        for (let key in options) {
            arr.push(<QuestionOption optionLabel={key} optionText={options[key]} questionId={questionId}  myanswer={myanswer} key={key} addOptionToCorrectAnswer={addOptionToCorrectAnswer} />);
        }
        return arr;
    }

    return (
        <>
            <Stack spacing={5} direction='column'>
                {showOptions(options)}
            </Stack>
        </>
    )

}