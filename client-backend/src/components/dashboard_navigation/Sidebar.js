import React from 'react';
import { Image, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';


const Sidebar = ({ isSidebarOpen, closeNav }) => {
  const [user] = useAuthState(auth);
  //   const closeNav = () => {
  //     document.getElementById('profile--sidebar').style.width = '0';
  //     document.getElementById('main').style.marginLeft = '0';
  //     document.querySelector('.open-btn').style.display = 'block';
  //   };

  //   const openNav = () => {
  //     document.getElementById('profile--sidebar').style.width = '300px';
  //     document.getElementById('main').style.marginLeft = '300px';
  //     document.querySelector('.open-btn').style.display = 'none';
  //   };

  return (
    <div
      id="profile--sidebar"
      className="sidebar"
      style={{ width: isSidebarOpen ? '300px' : '0' }}
    >
      <a href='#' className="close-btn" onClick={closeNav}>
        ×
      </a>
      {
        user?.photoURL ? <div><Image
          borderRadius='full'
          boxSize='150px'
          src={user?.photoURL}
          alt={user?.displayName}
        /></div> :
          <div className="profile--img"></div>
      }
      <br></br>
      <h3>Hi {user?.displayName}!</h3>

      <Link to='/dashboard/publicquizzes'>
        <Button colorScheme='yellow'>
          Try Quizzes by our users
        </Button>
      </Link>

      <div className="stats">
        <div className="quiz--total">
          <i className="fa-solid fa-graduation-cap"></i>
          <p>Quiz completed</p>
          <p id="total">53</p>
        </div>
        <div className="iq--level">
          <i className="fa-solid fa-brain"></i>
          <p>Knowledge Level</p>
          <p id="iq">53</p>
        </div>
      </div>

      <div className="score--streak">
        <h4>Achievements</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse veniam
          excepturi odit labore non in accusamus deleniti quas, repellat enim
          dignissimos quidem delectus consectetur ratione vitae, voluptatibus,
          veritatis maxime ullam.
        </p>
      </div>

      <div className="side--footer">
        <div className="pages">
          <a href="/learning/about">About</a>
          <a href="/learning/features">Features</a>
          <a href="/learning/contact">Contact</a>
        </div>

        <div className="exit--setting">
          <a href="/learning/logout">
            <i className="fa-solid fa-right-from-bracket fa-xl"></i>
          </a>
          <a href="/learning/setting">
            <i className="fa-solid fa-gear fa-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
