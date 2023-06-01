import React from 'react';

const QuizCard = props => {
  return (
      <div className="card" style={{height:'auto'}}>
        <div className="card-img">
          <img
            src={require(`../../assets/images/${
              props.img === '' ? 'set.jpeg' : props.img
            }`)}
            alt="quiz background"
          />
        </div>
        <div className="card-info">
          <p className="text-title">{props.title}</p>
          <p className="text-body">{props.description}</p>
        </div>
        <div className="card-footer">
          <span className="text-title">
            Score{': '}
            <span
              style={
                ({ fontStyle: 'italic' },
                { fontWeight: 'normal' },
                { fontSize: '0.7rem' })
              }
            >
              {props.score}
            </span>
          </span>
          <a href="/dashboard/setquiz/:quizId?" className="card-button">
            <i
              className="fa-solid fa-arrow-right"
              style={{ color: '#1c1c1c' }}
            ></i>
          </a>
        </div>
      </div>
  );
};

export default QuizCard;
