// stan
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import { TwitterShareButton, TwitterIcon } from 'react-share';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';
const REACT_APP_HOSTF = process.env.REACT_APP_HOSTF || 'http://localhost:3000';

const SetQuizCard = ({ quiz }) => {
  const [copySuccess, setCopySuccess] = useState('');

  // your function to copy here

  const copyToClipBoard = async copyMe => {
    try {
      console.log(copyMe);
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
      // Sleep for 3 seconds (3000 milliseconds) before clearing the message
      setTimeout(() => {
        setCopySuccess('');
      }, 3000);
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  const text =
    "📚 Check out this exciting quiz on QuizWhiz! 🎉 Test your knowledge and challenge yourself with engaging questions. 🧠💡 Don't miss out on the fun! Start the quiz now:  ";
  const via = 'Bolexzyy__';
  const hashtags = ['QuizWhiz', 'Trivia', 'KnowledgeChallenge'];
  const accts = ['@Bolexzyy__'];

  return (
    <>
      <div
        className="container card mx-2 mx-sm-3 "
        style={{ height: 'auto', width: '13rem' }}
      >
        <Link to={`/dashboard/setquiz/${quiz.test_id}`}>
          <div className="card-img">
            <img
              src={require(`../../assets/images/${'set.jpeg'}`)}
              alt="quiz background"
            />
          </div>
        </Link>
        <div className="card-body">
          <h5 className="card-title text-title">{quiz.title}</h5>
          <p className=" card-text">{quiz.description}</p>
          <div className="card-footer">
            <div>
              <TwitterShareButton
                onLoad={() => {}}
                url={`${REACT_APP_HOSTF}/dashboard/takequiz/${quiz.test_id}`}
                title={text}
                via={via}
                hashtags={hashtags}
                related={accts}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                copyToClipBoard(
                  `${REACT_APP_HOSTF}/dashboard/takequiz/${quiz.test_id}`
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-clipboard"
                viewBox="0 0 16 16"
              >
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
              </svg>
            </button>
            {copySuccess}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetQuizCard;
