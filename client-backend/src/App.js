import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Text, Center } from '@chakra-ui/react';

import Root from './components/Root';
import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Center><Text>Home page</Text></Center>,
      },
      {
        path: "/setting",
        element: <Center><Text>Setting page</Text></Center>,
      },
      {
        path: "/takequiz",
        element:<Center><Text>I dont know what this is supposed to be</Text></Center>,
      },
      {
        path: "/setquiz",
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
