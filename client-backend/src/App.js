import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import QuizSettingPage from './components/quiz_settings_components/QuizSettingPage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QuizSettingPage />
    </ChakraProvider>
  );
}

export default App;
