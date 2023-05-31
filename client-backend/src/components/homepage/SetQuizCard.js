// stan
import React from 'react';
import { Link } from 'react-router-dom';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000'
const REACT_APP_HOSTF = process.env.REACT_APP_HOSTF || 'http://localhost:3000'


const SetQuizCard = ({ quiz }) => {
  return (
    <>
      <div className="card">
        <Link to={`/dashboard/setquiz/${quiz.test_id}`}>
          <div className="card-img">
            <img
            src={require(`../../assets/images/${'set.jpeg'}`)}
            alt="quiz background"
          />
          </div>
          <div className="card-info">
            <p className="text-title">{quiz.title}</p>
            <p className="text-body">{quiz.description}</p>
          </div>
        </Link>

        <div className="card-footer" style={{ display: 'flex', flexDirection: 'row' }}>
          <span style={{ fontSize: '10px' }}>
            Share quiz link: {`${REACT_APP_HOSTF}/dashboard/takequiz/${quiz.test_id}`}
          </span>
        </div>
      </div>
    </>
  );
};

export default SetQuizCard;
