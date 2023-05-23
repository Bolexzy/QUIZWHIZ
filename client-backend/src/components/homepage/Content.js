import React from 'react';

const Content = () => {
  return (
    <div class="home--content">
      <h2>My Quizzes</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sunt
        aliquam distinctio architecto facere, illo consectetur minus labore
        facilis adipisci quo ea nemo quis itaque. Alias ratione laboriosam unde
        doloribus?
      </p>

      <div class="quiz--cards">
        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <p class="text-title">Quiz title </p>
            <p class="text-body">Quiz description and details</p>
          </div>
          <div class="card-footer">
            <span class="text-title">50%</span>
            <div class="card-button">
              <i
                class="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-img quiz-image1"></div>
          <div class="card-info">
            <p class="text-title">Quiz title </p>
            <p class="text-body">Quiz description and details</p>
          </div>
          <div class="card-footer">
            <span class="text-title">50%</span>
            <div class="card-button">
              <i
                class="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <p class="text-title">Quiz title </p>
            <p class="text-body">Quiz description and details</p>
          </div>
          <div class="card-footer">
            <span class="text-title">50%</span>
            <div class="card-button">
              <i
                class="fa-solid fa-arrow-right"
                style={{ color: '#1c1c1c' }}
              ></i>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-img"></div>
          <div class="card-info">
            <p class="text-title">Quiz title </p>
            <p class="text-body">Quiz description and details</p>
          </div>
          <div class="card-footer">
            <span class="text-title">50%</span>
            <div class="card-button">
              <i
                class="fa-solid fa-arrow-right"
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
