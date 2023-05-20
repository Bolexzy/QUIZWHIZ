import React from 'react';
import { Text } from '@chakra-ui/react';


export default function QuizInfo({quiz}){

    return(
        <>
         <Text fontSize='xs'>Questions: {quiz.length}</Text>
        </>
    )
}