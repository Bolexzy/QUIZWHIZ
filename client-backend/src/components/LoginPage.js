import React, {useState} from 'react';
import firebaseApp from './firebase__init_scripts/firebaseAppInit';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { redirect } from "react-router-dom";
import '../styles/LoginPage.css';

const provider = new GoogleAuthProvider();
const auth = getAuth();


const LoginPage = () => {

    const [loginError, setLoginError] = useState('');

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
                    return redirect("/dashboard");
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

    return (
        <div className="login-page">
            <h1>Login</h1>
            {
                loginError && <div className="login-error">
                    <span className="login-error__message">{loginError}</span>
                </div>
            }
            <button className="google-signup-button" onClick={handleGoogleSignup}>
                Sign up with Google
            </button>
        </div>
    );
};

export default LoginPage;
