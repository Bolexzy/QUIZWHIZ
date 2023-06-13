import React, { useState, useEffect } from 'react';
import {
  Flex,
  CardHeader,
  Card,
  Box,
  Avatar,
  CardBody,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  Button,
  Heading,
  Stack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from '@chakra-ui/react';
import { firebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import { useAuthState } from 'react-firebase-hooks/auth';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

export default function PublicQuizzesList() {
  const [user, loading, error] = useAuthState(auth);
  const [PublicQuizzes, setPublicQuizzes] = useState([]);

  useEffect(() => {
    if (!loading) {
      user.getIdToken().then(token => {
        fetch(`${REACT_APP_HOSTB}/public/quiz`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(res => {
            res.json().then(quiz => {
              setPublicQuizzes(quiz);
            });
          })
          .catch(err => {
            alert('failed to get quizzes. please try again');
          });
      });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <Stack
        padding={4}
        spacing={1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
        }}
      >
        <Skeleton height="40px">
          <Box>Hello World!</Box>
        </Skeleton>
        <Skeleton height="40px" bg="green.500" color="white" fadeDuration={1}>
          <Box>Hello React!</Box>
        </Skeleton>
        <Skeleton
          height="40px"
          fadeDuration={4}
          bg="blue.500"
          color="white"
        ></Skeleton>
      </Stack>
    );
  }

  return (
    <Flex
      flexWrap={'wrap'}
      style={{
        marginTop: '40px',
        padding: '10px',
        justifyContent: 'center',
        minWidth: '450px',
      }}
    >
      {PublicQuizzes.map(quiz => (
        <Card
          className="mx-auto my-3"
          maxW="19rem"
          key={quiz.test_id}
          style={{ margin: '10px', padding: '15px' }}
        >
          <CardHeader
            mb="5px"
            p="2px"
            style={{ border: '1px solid transparent' }}
          >
            <Flex spacing="4">
              <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                <Avatar
                  name={quiz.quizCreator.name}
                  src={quiz.quizCreator.picture}
                />
                <Box>
                  <Heading size="sm"> Created by:</Heading>
                  <Heading size="sm">{quiz.quizCreator.name}</Heading>
                </Box>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody mt="5px" p="2px">
            <Box style={{ fontWeight: 'bold' }}>
              <Text>Title:</Text>
              <Text>{quiz.title}</Text>
              <Text>description:</Text>
              <Text>{quiz.description}</Text>
              <Text>Time: {quiz.allotted_time_in_mins} mins</Text>
            </Box>

            <Flex flexWrap={'wrap'}>
              <Link to={`/dashboard/takequiz/${quiz.test_id}`}>
                <Button colorScheme="teal" variant="outline">
                  Take quiz
                </Button>
              </Link>
              <Link to={`/dashboard/publicquizresult/${quiz.test_id}`}>
                <Button colorScheme="teal" variant="outline">
                  See Results
                </Button>
              </Link>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </Flex>
  );
}
