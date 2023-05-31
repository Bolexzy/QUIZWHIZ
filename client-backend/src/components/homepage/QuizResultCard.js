import React from 'react';
import { Link } from 'react-router-dom';

const QuizResultCard = ({ result }) => {
    return (
        <>
            <div className="card">
                <div className="card-img">
                    <img
                        src={result.profile_picture}
                        alt="result background"
                    />
                </div>
                <div className="card-info">
                    <p className="text-title">{result.quiz_title}</p>
                    <p className="text-body">{result.quiz_description}</p>
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
                            {result.right_answers}/{result.total_questions}
                        </span>
                    </span>
                    <Link to={`/dashboard/takequiz/${result.quiz_id}`} className="card-button">
                        Try again
                        <i
                            className="fa-solid fa-arrow-right"
                            style={{ color: '#1c1c1c' }}
                        ></i>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default QuizResultCard;
