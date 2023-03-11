
import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../Components/NavBars/NavBarProfilePage.css';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function EmployerPorfilePage() {
    const [user, setUser] = useState(null);
    const [companyName, setCompanyName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                    setCompanyName(snapshot.data().companyName)
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
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    }
    const handleSaveChanges = async (event) => {
        event.preventDefault();
        if (!isEditing) {
            return;
        }
        const uid = auth.currentUser.uid
        const userRef = doc(firestore, "Users", uid)
        const updatedUser = {
            email: email,
            role: role,
            companyName: companyName
        }

        await updateDoc(userRef, updatedUser);
        setUser(updatedUser);
        setIsEditing(false);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <NavBarProfilePage />
            <Wrapper>
                <form className='form' onSubmit={handleSaveChanges}>
                    <h3>My Profile</h3>
                    <div className='form-center'>
                        <div className="avatar-container">
                        </div>
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                        <FormRow type="text" name="Company Name" value={companyName} handleChange={handleCompanyNameChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                    </div>
                    <span>{<br />}</span>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                </form>
            </Wrapper>
        </div>
    );
}
