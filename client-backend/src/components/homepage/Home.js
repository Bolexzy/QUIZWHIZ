import React from 'react';

const Content = () => {
  return (
    <div className="home--content">
      <h2>My Quizzes</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sunt
        aliquam distinctio architecto facere, illo consectetur minus labore
        facilis adipisci quo ea nemo quis itaque. Alias ratione laboriosam unde
        doloribus?
      </p>

      <div className="quiz--cards">
        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">
            <p className="text-title">Quiz title </p>
            <p className="text-body">Quiz description and details</p>
          </div>
          <div className="card-footer">
            <span className="text-title">50%</span>
            <div className="card-button">
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-img quiz-image1"></div>
          <div className="card-info">
            <p className="text-title">Quiz title </p>
            <p className="text-body">Quiz description and details</p>
          </div>
          <div className="card-footer">
            <span className="text-title">50%</span>
            <div className="card-button">
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">
            <p className="text-title">Quiz title </p>
            <p className="text-body">Quiz description and details</p>
          </div>
          <div className="card-footer">
            <span className="text-title">50%</span>
            <div className="card-button">
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">
            <p className="text-title">Quiz title </p>
            <p className="text-body">Quiz description and details</p>
          </div>
          <div className="card-footer">
            <span className="text-title">50%</span>
            <div className="card-button">
              <i
                className="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
