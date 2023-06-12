import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { background } from '@chakra-ui/react';

const Main = ({ isSidebarOpen, openNav }) => {
  return (
    <div
      className="container"
      id="main"
      style={{ paddingLeft: isSidebarOpen ? '300px' : '0' }}
    >
      <header
        className={`dashboard--header ${isSidebarOpen ? 'menuDisplayed' : ''}`}
      >
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light py-1 fixed-top ${
            isSidebarOpen ? 'menuDisplayed' : ''
          }`}
        >
          <div className="container-fluid">
            <button
              className="open-btn"
              onClick={openNav}
              style={{ display: isSidebarOpen ? 'none' : 'block' }}
            >
              <i className="fa-solid fa-bars"></i>
            </button>

            <Link to="/dashboard" replace="true">
              <div
                className="navbar-brand me-auto ms-md-5"
                href="/dashboard"
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
            {/* <div className="search">
              <input
                type="text"
                className="search__input"
                placeholder="Type your text"
              />
              <button className="search__button">
                <svg
                  className="search__icon"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
              </button>
            </div> */}
            {/* <div className="nav--menu">
              <i>
                <Link to="/dashboard/setquiz">
                  <i
                    className="fa-solid fa-square-plus fa-2xl"
                    style={{ color: '#000000' }}
                  ></i>
                </Link>
              </i>
            </div> */}
            {/* <div className="d-flex justify-content-evenly">
              <a className="add-icon me-4">
                <Link to="/dashboard/setquiz">
                  <i
                    className="fa-solid fa-square-plus fa-2xl"
                    style={{ color: '#000000' }}
                  ></i>
                </Link>
              </a>
            </div> */}

            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>

              <Link
                to="/dashboard/setquiz"
                type="button"
                class="btn btn-secondary ms-2 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                </svg>
              </Link>
            </form>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Main;
