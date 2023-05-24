import React, { createContext } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Text, Center } from '@chakra-ui/react';


//Global Pages
import LandingPage from './components/landing_page/LandingPage';
import DashboardRoot from './components/DashboardRoot';
import Home from './components/homepage/Home';
import Page from './components/Page'

//Stanley Components
import './App.css';
import './index.css';
import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage';
import QuizTakingPage from './components/quiz_taking_component/QuizTakingPage';
import LoginPage from './components/LoginPage';


//Bolexy Components
import Quiz from './components/Quiz_creation_page/Quiz';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardRoot />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: 'setting',
            element: (
              <Center>
                <Text>Setting page</Text>
              </Center>
            ),
          },
          {
            path: 'takequiz',
            element: <QuizTakingPage />,
          },
          {
            // path: 'setquiz',
            path: 'setquiz/:quizId?',
            element: <Quiz />,
          },
          // test for my setquiz page
          {
            path: 'setquiz_stan/:quizId?',
            element: <QuizSettingPage />,
          },
          {
            path: 'takequiz',
            element: <QuizTakingPage />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
