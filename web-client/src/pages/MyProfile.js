import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import { Link, Router, useNavigate } from "react-router-dom";
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../Components/NavBars/NavBarProfilePage.css';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, } from "firebase/auth";
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"
import { useUserAuth } from '../firebase/UserAuthContext';

export default function MyProfile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                } else {
                    console.log("User doc missing")
                }
            } else {
                console.log("User not logged in")
                setUser(null);
            }
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
    <div>
        <NavBarProfilePage/>
            <Wrapper>
                <form className='form'>
                    <h3>Profile</h3>
                    <div className='form-center'>
                        <FormRow type="text" name="First name" value ={user.firstName}/>
                        <FormRow type="text" name="Last name" value ={user.lasttName}/>
                        <FormRow type="text" name="Role" value ={user.Role}/>
                    </div>
                </form>
            </Wrapper>
    </div>
    );
}
