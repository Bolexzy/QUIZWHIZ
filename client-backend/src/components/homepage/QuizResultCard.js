import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const QuizResultCard = ({ result }) => {
  return (
    <>
      <div
        className="container card mx-2 mx-sm-3"
        style={{ height: 'auto', padding: '10px', paddingBottom: '0px' }}
      >
        <div className="card-img">
          <img src={result.profile_picture} alt="result background" />
        </div>
        <div className="card-body">
          <p className="card-title text-title">{result.quiz_title}</p>
          <p className="text-body">{result.quiz_description}</p>
          <div
            className="card-footer"
            style={{
              padding: '2px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <span
              className="text-title"
              style={{ height: 'auto', paddingBottom: '5px' }}
            >
              Score{': '}
              <span
                style={
                  ({ fontStyle: 'italic' },
                  { fontWeight: 'normal' },
                  { fontSize: '0.7rem' })
                }
              >
                {result.right_answers}/{result.total_questions}
              </span>
              <Text style={{ padding: '0px' }}>
                percentage score:{' '}
                {(result.right_answers / result.total_questions) * 100}%
              </Text>
            </span>
            <Link
              to={`/dashboard/takequiz/${result.quiz_id}`}
              className="card-button"
            >
              Try again
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultCard;
