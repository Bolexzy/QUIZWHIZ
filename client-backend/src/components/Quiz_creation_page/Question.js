import React, { useState } from 'react';
import Answer from './Answer';

const Question = ({ question, handleQuestionChange, pull_func }) => {
  // add and update options
  const [options, setOptions] = useState([{ id: 1, text: '' }]);

  const handleAddOption = () => {
    const newOption = { id: options.length + 1, text: '' };
    setOptions([...options, newOption]);
  };

  const handleOptionChange = (optionId, newText) => {
    const updatedOptions = options.map(option =>
      option.id === optionId ? { ...option, text: newText } : option
    );
    pull_func(newText);
    setOptions(updatedOptions);
  };
  // show answer options
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleToggleAnswer = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <>
      <div className="question--container">
        <input
          placeholder="Untitled Question"
          className="input-field"
          type="text"
          value={question.text}
          onChange={e => handleQuestionChange(question.id, e.target.value)}
        />
        <label for="input-field" class="input-label">
          Enter Question
        </label>
        <span className="input-highlight"></span>
        <i
          className="fa-solid fa-caret-down fa-xl"
          style={{ color: '#000000' }}
          onClick={handleToggleAnswer}
        ></i>
      </div>

      {isAnswerVisible && (
        <div
          className={`answer--container ${
            isAnswerVisible ? 'visible' : 'hidden'
          }`}
        >
          <Answer
            isAnswerVisible={isAnswerVisible}
            options={options}
            handleOptionChange={handleOptionChange}
          />
          <button class="button-plus" onClick={handleAddOption}>
            <i
              class="fa-solid fa-circle-plus fa-xl"
              style={{ color: '#000000' }}
            ></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Question;
