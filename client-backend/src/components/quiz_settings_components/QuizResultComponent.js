import React, { useState, useEffect } from "react";
import { Flex, Select, Text, Heading, Avatar, Button, Image, Box, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { firebaseApp, auth } from "../firebase__init_scripts/firebaseAppInit";
import { useAuthState } from "react-firebase-hooks/auth";

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

const filterFunctions = {
    name: (fisrtItem, secondItem) => { return fisrtItem.user_name - secondItem.user_name },
    date: (fisrtItem, secondItem) => { return secondItem.date_taken - fisrtItem.date_taken },
    score: (fisrtItem, secondItem) => { return (secondItem.right_answers / fisrtItem.total_questions * 100) - (fisrtItem.right_answers / fisrtItem.total_questions * 100)},
}

export default function QuizResultComponent({ quizId }) {

    const [user, loading, error] = useAuthState(auth);
    const [filerfunction, setFilterFunction] = useState('');
    const [resultsArray, setReaultsArray] = useState([]);


    function sortResult(e) {
        const sortFunction = filterFunctions[e.target.value];
        setReaultsArray((prevState)=>{
            let newresult = JSON.parse(JSON.stringify(prevState))
            newresult.sort(sortFunction);
            return newresult
        })
    }

    useEffect(function () {
        if (!loading) {
            user.getIdToken().then((token) => {
                fetch(`${REACT_APP_HOSTB}/quiz/result/${quizId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }).then((res) => res.text())
                    .then((text) => JSON.parse(text))
                    .then((resultsArray) => {
                        setReaultsArray(resultsArray)
                    })
                    .catch((err) => { console.log(err); });
            });
        }
    }, [user])

    return (
        <Flex flexDirection='column'>
            <Text>Sort by</Text>
            <Select mb='30px' placeholder='Select option' maxW='15rem' onChange={sortResult}>
                <option value='name'>name</option>
                <option value='score'>score</option>
                <option value='date'>date</option>
            </Select>
            <Flex flexWrap={'wrap'}>
                {resultsArray.map((result) => (
                    <Card maxW='15rem' key={result.date_taken}>
                        <CardHeader>
                            <Flex spacing='4'>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Avatar name={result.user_name} src={result.profile_picture} />
                                    <Box>
                                        <Heading size='sm'>{result.user_name}</Heading>
                                    </Box>
                                </Flex>
                            </Flex>
                        </CardHeader>
                        <CardBody>
                            <Text>Date: {new Date(result.date_taken).toString()}</Text>
                            <Text> score: {result.right_answers}/{result.total_questions}</Text>
                            <Text>percentage score: {result.right_answers / result.total_questions * 100}%</Text>
                            <Text></Text>
                            <Text></Text>
                        </CardBody>
                    </Card>
                ))}
            </Flex>
        </Flex>
    );
}