import React, { useState } from 'react';
import { firebaseApp, auth } from './firebase__init_scripts/firebaseAppInit';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import '../styles/LoginPage.css';

const provider = new GoogleAuthProvider();


const LoginPage = () => {

    const [user, loading] = useAuthState(auth);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const handleGoogleSignup = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                if (user) {
                    navigate("/dashboard", {replace: true})
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

    if (loading) {
        return (
            <Box padding='6' boxShadow='lg' bg='white'>
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
            <button className="google-signin-button" onClick={handleGoogleSignup}>
                Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;