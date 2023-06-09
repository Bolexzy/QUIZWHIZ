import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section>
      <div className="hero container-sm row flex-center pt-5 mt-1">
        <div className="main--info col-md-12 col-lg-6 text-center text-md-left">
          <h1 className="h1-responsive in-left">
            Learn new concepts for each question
          </h1>

          <p className="in-left px-3 py-3 text-start fw-lighter fs-4">
            We help you prepare for exams and quizzes
          </p>

          <Link to="/login">
          <button className="btn in-left start-btn">Start solving</button>
          </Link>
        </div>

        <div
          className=" col-md-12 col-lg-6"
          style={{ animation: 'fadeInRight 1s ease-in-out' }}
        >
          <img
            src={require('../../assets/landingicon.png')}
            alt="people raising question blocks illustration"
            className="img-fluid welcome--image "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
