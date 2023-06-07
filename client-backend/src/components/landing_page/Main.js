import React from 'react';
import Hero from './Hero';
import Team from './Team';
import Feature from './Feature';

const Main = () => {
  return (
    <main
      className="container w-100  d-flex flex-column align-items-center mb-5"
      style={{ marginTop: '8rem' }}
    >
      <Hero />
      <section className="container w-100  d-flex flex-column align-items-center mt-5">
        <div className="container-sm mx-4">
          <h2
            className="pb-2 fw-semibold fs-2 border-bottom border-light-subtle"
            id="how_it_works"
            style={({ animation: 'fadeIn 5s' }, { fontFamily: 'sans-serif' })}
          >
            How It Works
          </h2>
          <p
            className="fs-6 mt-4"
            style={{ color: 'rgb(97, 96, 96)', animation: 'fadeIn 5s' }}
          >
            QuizWhiz is an innovative learning platform that revolutionizes the
            way you prepare for exams and quizzes. Our AI-powered system
            generates personalized quizzes based on different difficulty levels
            and subjects, aligning with your institution's curriculum. You'll be
            presented with carefully curated questions that challenge your
            knowledge and help you learn new concepts.
          </p>
          <p
            className="fs-6 mt-4"
            style={({ color: 'grey' }, { animation: 'fadeIn 5s' })}
          >
            Sign up, take AI-generated quizzes, schedule quizzes, track your
            progress, and learn new concepts to enhance your exam preparation
            and quiz performance.
          </p>

          <h2
            className="pb-2 fw-semibold fs-2 border-bottom border-light-subtle mt-5"
            id="about_quizwhiz"
            style={({ animation: 'fadeIn 5s' }, { fontFamily: 'sans-serif' })}
          >
            About QuizWhiz
          </h2>
          <p
            className="fs-6 mt-4"
            style={({ color: 'rgb(97, 96, 96)' }, { animation: 'fadeIn 5s' })}
          >
            QuizWhiz is a leading online learning platform that empowers
            students and professionals to excel in their exams and quizzes. Our
            mission is to make studying engaging, efficient, and effective
            through innovative features and advanced technologies.
          </p>
          <p
            className="fs-6 mt-4"
            style={({ color: 'rgb(97, 96, 96)' }, { animation: 'fadeIn 5s' })}
          >
            Our team of experts and educators work tirelessly to curate
            high-quality questions across various subjects and difficulty
            levels.
          </p>

          <div
            className="container d-flex align-items-center flex-column flex-sm-row -mx-sm-2 justify-content-around mt-5"
            style={{ animation: 'fadeIn 5s' }}
          >
            <Team />
          </div>
          <h2
            className="pb-2 fw-semibold fs-2 border-bottom border-light-subtle mt-5"
            id="features"
            style={({ animation: 'fadeIn 5s' }, { fontFamily: 'sans-serif' })}
          >
            Features
          </h2>
          <div
            class="d-flex flex-column flex-sm-row -mx-sm-2"
            style={{ animation: 'fadeIn 5s' }}
          >
            <Feature />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
