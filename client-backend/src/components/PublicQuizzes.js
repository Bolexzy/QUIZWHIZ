import React, { useState, useEffect } from 'react';
import { Flex, CardHeader, Card, Box, Avatar, CardBody, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Button, Heading, Stack, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { firebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';

const HOSTB = process.env.HOSTB || 'http://localhost:4000';

export default function PublicQuizzes() {


    const [user, loading, error] = useAuthState(auth);
    const [PublicQuizzes, setPublicQuizzes] = useState([])

    useEffect(() => {
        if (!loading) {
            user.getIdToken().then((token) => {

                fetch(`${HOSTB}/public/quiz`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }).then((res) => {
                    res.json().then((quiz) => {
                        setPublicQuizzes(quiz)
                    }).catch((error) => {

                    })

                }).catch((err) => {
                    console.log(err);
                });
            });
        }
    }, [user, loading]);

    if (loading) {
        return (
            <Stack padding={4} spacing={1}>
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
            {PublicQuizzes.map((quiz) => (
                <Card maxW='15rem' key={quiz.test_id}>
                    <CardHeader mb='5px' p='2px' style={{ border: '1px solid transparent' }}>
                        <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={quiz.quizCreator.name} src={quiz.quizCreator.picture} />
                                <Box>
                                    <Heading size='sm'> Created by:</Heading>
                                    <Heading size='sm'>{quiz.quizCreator.name}</Heading>
                                </Box>
                            </Flex>
                        </Flex>
                    </CardHeader>
                    <CardBody mt='5px' p='2px' style={{ border: '1px solid transparent' }}>
                        <Text>Title</Text>
                        <Text>{quiz.title}</Text>
                        <Text>description:</Text>
                        <Text>{quiz.description}</Text>
                        <Text>Time:</Text>
                        <Text>{quiz.allotted}</Text>
                        <Link to={`/dashboard/takequiz/${quiz.test_id}`}>
                        <Button colorScheme='teal' variant='outline'>
                            Take quiz
                        </Button>
                        </Link>

                    </CardBody>
                </Card>

            ))}
        </Flex>
    )
}