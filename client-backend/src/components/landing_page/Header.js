import React from 'react';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Header = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  function logout() {
    signOut();
  }

  return (
    <header className="landing--header w-100">
      <nav className="navbar navbar-expand-lg  py-4 fixed-top container-sm">
        <div className="container-fluid">
          <Link to="/" replace="true">
            <div
              className="navbar-brand me-auto ms-md-5"
              href="/"
              role="button"
            >
              <img
                src={logo}
                alt="quizwhiz"
                width="150"
                height="auto"
                className="img-fluid "
              />
            </div>
          </Link>
          <button
            className="navbar-toggler focus-ring"
            style={{ '--bs-focus-ring-color': '#e0e0e0' }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              style={{ color: '#813405' }}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center text-capitalize fs-6 fw-medium">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/dashboard"
                      className="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      Home
                    </Link>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
              )}
              <li className="nav-item">
                <a className="nav-link" href="#how_it_works">
                  How it Works?
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about_quizwhiz">
                  About us
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center ms-3 me-4">
              {user ? (
                <>
                  <button
                    type="button"
                    className="btn btn-bd-primary text-capitalize text-center fw-semibold text-sm"
                    onClick={logout}
                  >
                    signOut
                  </button>
                </>
              ) : (
                <NavLink to="/login" end>
                  <button
                    type="button"
                    className="btn btn-bd-primary text-capitalize text-center fw-semibold text-sm"
                  >
                    Login
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
