import React from 'react';
import { Stack } from '@chakra-ui/react';
import Option from './Option';

export default function QuestionOptions({
  questionId,
  options,
  addOptionToCorrectAnswer,
  myanswer,
}) {
  function showOptions(options) {
    let arr = [];
    for (let key in options) {
      arr.push(
        <Option
          optionLabel={key}
          optionText={options[key]}
          questionId={questionId}
          myanswer={myanswer}
          key={key}
          addOptionToCorrectAnswer={addOptionToCorrectAnswer}
        />
      );
    }
    return arr;
  }

  return <div className="options--container">{showOptions(options)}</div>;
}
