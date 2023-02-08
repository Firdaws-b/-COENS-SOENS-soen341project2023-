import React, {useEffect} from 'react';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import { firebaseConfig } from './firebase';
import { initializeApp } from "firebase/app";

const AuthGoogle = (props) => {
    firebase.initializeApp(firebaseConfig);

    useEffect(()=>{
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(props.auth);
        ui.start(".firebase-auth-container", {
            signInOptions: [
                {
                    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                    requireDisplayName: false
                }
            ],
            signInSuccessUrl: '/Home'
            //privacyPolicyUrl: 
        });
    },[props.auth]);
    /*return (
    <>
        <div>AuthGoogle</div>
        <div className={"firebase-auth-container"}></div>
   </>
        )*/
}
export default AuthGoogle