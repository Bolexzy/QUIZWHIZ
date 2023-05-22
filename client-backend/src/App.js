import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Text, Center } from '@chakra-ui/react';
import './App.css';
import Root from './components/Root';
import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage';
import QuizTakingPage from './components/quiz_taking_component/QuizTakingPage';

import './index.css';
import LandingPage from './components/landing_page/LandingPage';


const router = createBrowserRouter([
  {
    path: '/',
    // modified to landing page
    element:<Root />,
    children: [
      {
        index: true,
        element: (<LandingPage />),
      },
      {
        path: '/setting',
        element: (
          <Center>
            <Text>Setting page</Text>
          </Center>
        ),
      },
      {
        path: "/takequiz",
        element:<QuizTakingPage />,
      },
      {
        path: '/setquiz',
        element: <QuizSettingPage />,
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
