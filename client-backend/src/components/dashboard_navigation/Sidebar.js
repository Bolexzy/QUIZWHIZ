import React from 'react';
import { Image, Button, border } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { firebaseApp, auth } from '../firebase__init_scripts/firebaseAppInit';

const Sidebar = ({ isSidebarOpen, closeNav }) => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  function logout() {
    signOut();
    navigate('/', { replace: true });
  }

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
      className="sidebar-wrapper "
      color="white"
      style={{
        width: isSidebarOpen ? '300px' : '0',
        position: 'fixed',
        overflowY: 'auto',
        top: 0,
        bottom: 0,
        left: 0,
        height: '100vh',
      }}
    >
      <div
        className="close-btn"
        onClick={closeNav}
        style={{ position: 'absolute', top: 15, right: 30 }}
      >
        ×
      </div>
      <Link
        to="/dashboard"
        style={{
          padding: '10px',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {user?.photoURL ? (
            <div>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user?.photoURL}
                alt={user?.displayName}
              />
            </div>
          ) : (
            <div className="profile--img"></div>
          )}
          <br></br>
          <h3>Hi {user?.displayName}!</h3>
        </div>
      </Link>

      <Link
        to="/dashboard/publicquizzes"
        style={{
          padding: '10px',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <Button colorScheme="yellow">Try Quizzes by our users</Button>
      </Link>

      <div className="stats">
        <div className="quiz--total">
          <Link to="/dashboard">
            <i className="fa-solid fa-graduation-cap"></i>
            <p>Quiz completed</p>
            <p id="total">53</p>
          </Link>
        </div>

        <div className="iq--level">
          <Link to="/dashboard">
            <i className="fa-solid fa-brain"></i>
            <p>Knowledge Level</p>
            <p id="iq">53</p>
          </Link>
        </div>
      </div>

      {/* <div className="score--streak" style={{ position: 'relative' }}>
        <h4 style={{ textAlign: 'center' }}>Achievements</h4>
        <p style={{ textAlign: 'center' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse veniam
          excepturi odit labore non in accusamus deleniti quas, repellat enim
          dignissimos quidem delectus consectetur ratione vitae, voluptatibus,
          veritatis maxime ullam.
        </p>
      </div> */}

      <div className="side--footer" style={{ position: 'absolute', bottom: 0 }}>
        <div className="pages">
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <div className="exit--setting">
            <span href="/learning/logout" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket fa-xl"></i>
            </span>
            {/* <a href="/learning/setting">
            <i className="fa-solid fa-gear fa-xl"></i>
          </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
