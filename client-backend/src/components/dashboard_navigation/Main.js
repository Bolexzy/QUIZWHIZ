import React from 'react';
import { Link } from "react-router-dom";

const Main = ({ isSidebarOpen, openNav }) => {
    
  return (
    <div id="main" style={{ marginLeft: isSidebarOpen ? '300px' : '0' }}>
      <header>
        <button
          className="open-btn"
          onClick={openNav}
          style={{ display: isSidebarOpen ? 'none' : 'block' }}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <nav className="container">
          <div className="logo"></div>
          <div className="search">
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
          </div>
          <div className="nav--menu">
            <i>
            <Link to="/dashboard/setquiz">
              <i
                className="fa-solid fa-square-plus fa-2xl"
                style={{ color: '#000000' }}
              ></i>
              </Link>
            </i>
            <a href="/learning/">
              <i
                className="fa-solid fa-bell fa-2xl"
                style={{ color: '#0d0d0d' }}
              ></i>
            </a>
          </div>
        </nav>
        <hr></hr>
      </header>
    </div>
  );
};

export default Main;
