import React from 'react';
import { Checkbox } from '@chakra-ui/react';

const Answer = ({ options, handleOptionChange }) => {
  return (
    options &&
    options.map(option => (
      <label class="checkbox-container">
        <Checkbox colorScheme="green" defaultChecked></Checkbox>
        <input
          placeholder="Untitled Question"
          className="input-field"
          type="text"
          value={option.text}
          onChange={e => handleOptionChange(option.id, e.target.value)}
        />
        <label for="input-field" class="input-label">
          Option
        </label>
        <span className="input-highlight"></span>
        <span></span>
      </label>
    ))
  );
};

export default Answer;
