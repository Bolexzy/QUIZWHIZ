import React, { useState } from 'react';
import { firebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import GoogleIcon from '../assets/google-color-svgrepo-com.svg';
import GithubIcon from '../assets/github-octocat-svgrepo-com.svg';



import '../styles/LoginPage.css';

const REACT_APP_HOSTB = process.env.REACT_APP_HOSTB || 'http://localhost:4000';

const googleProvider = new GoogleAuthProvider();
const GithubProvider = new GithubAuthProvider();


const LoginPage = () => {

    const [user, loading] = useAuthState(auth);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignup = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                if (user) {
                    user.getIdToken().then((token) => {
                        fetch(`${REACT_APP_HOSTB}/adduser`, {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${token}`
                            },
                        }).catch(() => { console.log('failed to add user to firestore') });
                    });

                    navigate("/dashboard", { replace: true })
                }
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                console.log('signin failed', error)
                setLoginError('An error occurred during login. Please try again.');
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };


    const handleGithubSignup = () => {
        signInWithPopup(auth, GithubProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
                if (user) {
                    user.getIdToken().then((token) => {
                        fetch(`${REACT_APP_HOSTB}/adduser`, {
                            method: 'GET',
                            headers: {
                                'Content-type': 'application/json',
                                Authorization: `Bearer ${token}`
                            },
                        }).catch(() => { console.log('failed to add user to firestore') });
                    });
                    console.log('succeessful signin')
                    navigate("/dashboard", { replace: true })
                }
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
                // ...
                console.log('signin failed', error)
                setLoginError('An error occurred during login. Please try again.');
            });

    }

    if (loading) {
        return (
            <Box padding='6' boxShadow='lg' bg='white' style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}>
                <SkeletonCircle size='20' />
                <SkeletonText mt='4' noOfLines={20} spacing='5' skeletonHeight='5' />
            </Box>
        )
    }
    if (user) {
        return <Navigate to="/dashboard" />
    }
    return (
        <div className="login-page">
            <h1>Login</h1>
            {
                loginError && <div className="login-error">
                    <span className="login-error__message">{loginError}</span>
                </div>
            }
            <button style={{margin:'20px'}} className="google-signin-button" onClick={handleGoogleSignup}>
                <img style={{width:'30px', marginRight:'10px'}} src={GoogleIcon} alt='google icon' />
                Continue with Google
            </button>
            <button style={{ backgroundColor: '#endregion', color: 'black' }} className="google-signin-button" onClick={handleGithubSignup}>
                <img style={{width:'40px', marginRight:'10px'}} src={GithubIcon} alt='github icon' />
                Continue with GitHub
                </button>
        </div>
    );
};

export default LoginPage;
