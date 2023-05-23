import React,{createContext} from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Text, Center } from '@chakra-ui/react';

import './App.css';
import Root from './components/Root';
import Home from './components/homepage/Home';
import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage';
import QuizTakingPage from './components/quiz_taking_component/QuizTakingPage';
import LoginPage from './components/LoginPage';

import './index.css';
import Page from './components/Page';
import LandingPage from './components/landing_page/LandingPage';




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
        path: 'learning',
        element:<Home />
      },
      {
        path: 'login',
        element:<LoginPage />
      },
      {
        // modified to learning
        path: 'dashboard',
        element: <Root />,
        children: [
          {
            index: true,
            element: (
              <Center>
                <Text>Home page</Text>
              </Center>
            ),
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
            path: 'setquiz',
            element: <QuizSettingPage />,
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
