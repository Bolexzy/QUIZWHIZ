import React, { useState, useEffect } from 'react';
import { Flex, CardHeader, Card, Box, Avatar, CardBody, Text } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { Select, Button, Heading, Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { firebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';


const filterFunctions = {
    name: (fisrtItem, secondItem) => { return fisrtItem.user_name - secondItem.user_name },
    date: (fisrtItem, secondItem) => { return secondItem.date_taken - fisrtItem.date_taken },
    score: (fisrtItem, secondItem) => { return (secondItem.right_answers / fisrtItem.total_questions * 100) - (fisrtItem.right_answers / fisrtItem.total_questions * 100) },
}

export default function PublicQuizzesResult() {


    const [user, loading, error] = useAuthState(auth);
    const [filerfunction, setFilterFunction] = useState('');
    const [publicQuizResults, setPublicQuizResults] = useState([]);



    const { quizId } = useParams();

    function sortResult(e) {
        const sortFunction = filterFunctions[e.target.value];
        setPublicQuizResults((prevState) => {
            let newresult = JSON.parse(JSON.stringify(prevState))
            newresult.sort(sortFunction);
            return newresult
        })
    }

    useEffect(() => {
        if (!loading) {
            user.getIdToken().then((token) => {
                fetch(`${REACT_APP_HOSTB}/public/results/${quizId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }).then((res) => {
                    res.json().then((result) => {
                        if (Array.isArray(result)) {
                            setPublicQuizResults(result)
                        }
                    })
                }).catch((err) => {
                    alert('failed to get quizzes. please try again')
                });
            });
        }
    }, [user, loading]);

    if (loading) {
        return (
            <Stack padding={4} spacing={1} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
                <Skeleton height='40px'>
                    <Box>Hello World!</Box>
                </Skeleton>
                <Skeleton
                    height='40px'
                    bg='green.500'
                    color='white'
                    fadeDuration={1}
                >
                    <Box>Hello React!</Box>
                </Skeleton>
                <Skeleton
                    height='40px'
                    fadeDuration={4}
                    bg='blue.500'
                    color='white'
                >
                    <Box>Hello ChakraUI!</Box>
                </Skeleton>
            </Stack>
        )
    }

    return (
        <Flex flexWrap={'wrap'} style={{ marginTop: '20px', padding: '10px' }}>
             <Text>Sort by</Text>
                    <Select mb='30px' placeholder='Select option' maxW='15rem' onChange={sortResult}>
                        {/* <option value='name'>name</option> */}
                        <option value='score'>score</option>
                        <option value='date'>date</option>
                    </Select>
            <Flex style={{flexWrap:'wrap', justifyContent:'center'}} >
            {publicQuizResults.length !== 0 ?
                (<>
                    {
                        publicQuizResults.map((result) => (
                            <Card m={'10px'} maxW='15rem' key={result.date_taken}>
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
                                <CardBody style={{fontWeight:'bold'}}>
                                    <Text>Date: {new Date(result.date_taken).toString()}</Text>
                                    <Text> score: {result.right_answers}/{result.total_questions}</Text>
                                    <Text>percentage score: {result.right_answers / result.total_questions * 100}%</Text>
                                    <Text></Text>
                                    <Text></Text>
                                </CardBody>
                            </Card>
                        ))
                    }
                </>) :
                (<>
                    result is empty
                </>)
            }
            </Flex>
        </Flex>
    )
}