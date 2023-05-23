import React, { useState } from 'react';
import './AIQuestionGenerator.css'; // Import the CSS file for styling

const AIQuestionGenerator = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [numOfQuizzes, setNumOfQuizzes] = useState(0);
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission or data handling
    // You can access the values using the component's state variables: subject, topic, numOfQuizzes, and level
    // For example:
    console.log(subject, topic, numOfQuizzes, level);

    // Clear form inputs
    setSubject('');
    setTopic('');
    setNumOfQuizzes(0);
    setLevel('');
  };

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
          onChange={(e) => setNumOfQuizzes(parseInt(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label htmlFor="level">Level:</label>
        <select id="level" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">Select Level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AIQuestionGenerator;
