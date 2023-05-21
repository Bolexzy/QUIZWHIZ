import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './components/Root';
import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
