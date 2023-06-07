import React from 'react';

const Team = () => {
  return (
    <>
      <h3 className="mb-4 mb-sm-0">Meet Our Team</h3>
      {/* <!-- boluwatife card --> */}
      <div className="card mb-3 text-center" style={{ width: '14rem' }}>
        <div className="card-header d-flex align-items-center justify-content-center">
          <img
            src="https://avatars.githubusercontent.com/u/74738413?v=4"
            className=" rounded-circle"
            alt="Fissure in Sandstone"
            width="130px"
            height="130px"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title fw-semibold fs-6">Boluwatife Oyewumi</h5>
          <p className="card-text" style={{ fontSize: '.8rem' }}>
            Fullstack Software Developer
          </p>
        </div>
        <div className="card-body">
          <ul className="list-inline mb-0 text-center">
            <li className="list-inline-item">
              <a
                href="https://twitter.com/Bolexzyy__"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-twitter"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://www.linkedin.com/in/boluwatifeo/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-linkedin-in"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://github.com/Bolexzy"
                target="_blank"
                rel="noreferrer"
              >
                <span
                  className="fa-brands fa-github"
                  target="_blank"
                  rel="noreferrer"
                ></span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <!-- wisdom card --> */}
      <div className="card mb-3 text-center" style={{ width: '14rem' }}>
        <div className="card-header d-flex align-items-center justify-content-center">
          <img
            src="https://avatars.githubusercontent.com/u/60314035?v=4"
            className="rounded-circle"
            alt="Fissure in Sandstone"
            width="130px"
            height="130px"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title fw-semibold fs-6">Ononiwu Wisdom</h5>
          <p className="card-text" style={{ fontSize: '.8rem' }}>
            Fullstack Software Developer
          </p>
        </div>
        <div className="card-body">
          <ul className="list-inline mb-0 text-center">
            <li className="list-inline-item">
              <a href="/">
                <span className="fa-brands fa-twitter"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a href="/">
                <span className="fa-brands fa-linkedin-in"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://github.com/wisdom209"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-github"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* <!-- stanley card --> */}
      <div className="card mb-3 text-center" style={{ width: '14rem' }}>
        <div className="card-header d-flex align-items-center justify-content-center">
          <img
            src="https://avatars.githubusercontent.com/u/72026716?v=4"
            className=" rounded-circle"
            alt="Fissure in Sandstone"
            width="130px"
            height="130px"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title fw-semibold fs-6">Stanley Ezechuckwu</h5>
          <p className="card-text" style={{ fontSize: '.8rem' }}>
            Fullstack Software Developer
          </p>
        </div>
        <div className="card-body">
          <ul className="list-inline mb-0 text-center">
            <li className="list-inline-item">
              <a
                href="https://twitter.com/_stanllee?s=09"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-twitter"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://www.linkedin.com/in/stanley-ezechukwu"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-linkedin-in"></span>
              </a>
            </li>

            <li className="list-inline-item">
              <a
                href="https://github.com/stan6453"
                target="_blank"
                rel="noreferrer"
              >
                <span className="fa-brands fa-github"></span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Team;
