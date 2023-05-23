import React, { useState } from 'react';
import './AIQuestionGenerator.css'; // Import the CSS file for styling

const AIQuestionGenerator = ({appendToQuizArray}) => {

  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [numOfQuizzes, setNumOfQuizzes] = useState(0);
  const [level, setLevel] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();

    const prompt = generateAIPrompt(subject, topic, numOfQuizzes, level);
    console.log(subject, topic, numOfQuizzes, level);
  };


  function generateAIPrompt(){
    
  }

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="numOfQuizzes">Number of Quizzes:</label>
        <input
          type="number"
          id="numOfQuizzes"
          value={numOfQuizzes}
          min={1} max={5}
          onChange={(e) => setNumOfQuizzes(parseInt(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="level">Level:</label>
        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Neutral Level</option>
          <option value="Nursery education">Nursery education</option>
          <option value="Primary education">Primary education</option>
          <option value="Lower secondary education">Lower secondary education</option>
          <option value="Upper secondary education">Upper secondary education</option>
          <option value="Bachelor degree education">Bachelor degree education</option>
          <option value="Masters degree education">Masters degree education</option>
          <option value="Doctorate degree education">Doctorate degree education</option>
        </select>
      </div>

      <button className='stanbutton' type="submit">Submit</button>
    </form>
  );
};

export default AIQuestionGenerator;
