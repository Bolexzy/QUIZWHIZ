import React, { useState } from 'react';
import './Quiz.css';
import Content from './Content';

const options = [];

const Quiz = () => {
  //add and update questions
  const [questions, setQuestion] = useState([{ id: 1, text: '' }]);
  const [optionFromQuestion, setOptionFromQuestion] = useState([{}]);

  const handleAddQuestions = () => {
    const newQuestion = { id: questions.length + 1, text: '' };
    setQuestion([...questions, newQuestion]);
  };

  const handleQuestionChange = (questionId, newText) => {
    const updatedQuestion = questions.map(question =>
      question.id === questionId ? { ...question, text: newText } : question
    );
    setQuestion(updatedQuestion);
  };

  const pull_data = data => {
    options.push(data);
    setOptionFromQuestion(data);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Do something with the data, such as sending it to an API or saving it to a database
    console.log(questions);
    console.log(options);
  };

  return (
    <section className="quiz--page">
      <div class="quiz--container">
        <div class="quiz--cover">
          <div style={{ width: '100%' }}>
            <input
              placeholder="Quiz title"
              className="input-field"
              type="text"
              // value={question.text}
              // onChange={e => handleQuestionChange(question.id, e.target.value)}
              style={{ fontSize: '1.7rem' }}
            />
            {/* <label for="input-field" class="input-label">
              Enter title
            </label> */}
            <span className="input-highlight"></span>
          </div>

          <div style={{ width: '100%' }}>
            <input
              placeholder="Quiz description"
              className="input-field"
              type="text"
              // value={question.text}
              // onChange={e => handleQuestionChange(question.id, e.target.value)}
              style={{ fontSize: '1rem' }}
            />
            {/* <label for="input-field" class="input-label">
              Enter description
            </label> */}
            <span className="input-highlight"></span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <Content
            questions={questions}
            handleQuestionChange={handleQuestionChange}
            pull_func={pull_data}
          />
          <div className="container-btn">
            <button class="button_plus" onClick={handleAddQuestions}>
              <i
                class="fa-solid fa-circle-plus fa-xl"
                style={{ color: '#000000' }}
              ></i>
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Quiz;
