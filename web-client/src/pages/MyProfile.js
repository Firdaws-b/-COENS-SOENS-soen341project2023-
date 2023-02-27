import React, { useState, useEffect } from 'react';
import userAvatar from '../assets/user-avatar.jpg';
import { Link, Router, useNavigate } from "react-router-dom";
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { Button } from 'react-bootstrap';
import '../Components/NavBars/NavBarProfilePage.css';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"
import CountryDropdown from 'country-dropdown-with-flags-for-react';
import { useUserAuth } from '../firebase/UserAuthContext';

export default function MyProfile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [country, setCountry] = useState("");
    const [address,setAddress]= useState("");
    const [province, setProvince] = useState("");
    const [city, setCity] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const snapshot = await getDoc(doc(firestore, "Users", uid));
                if (snapshot.exists()) {
                    setUser(snapshot.data())
                    setFirstName(snapshot.data().firstName)
                    setLastName(snapshot.data().lastName)
                    setEmail(snapshot.data().email)
                    setRole(snapshot.data().role)
                    setCountry(snapshot.data().country)
                    setProvince(snapshot.data().province)
                    setAddress(snapshot.data().address)
                    setCity(snapshot.data().city)
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

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    const handleCountryChange = (value) => {
        setCountry(value);
    }
    const handleAddressChange = (value) => {
        setAddress(value);
    }
    const handleProvinceChange = (value) => {
        console.log(value)
        setProvince(value);
    }
    const handleCityChange = (value) => {
        
        setCity(value);
    }

    const handleSaveChanges = async (event) => {
        event.preventDefault();
        if (!isEditing){
            return;
        }
        const uid = auth.currentUser.uid
        const userRef = doc(firestore, "Users", uid)
        const updatedUser = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            role: role,
            country: country ,
            address:address ,
            province:province ,
            city: city
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
                        <FormRow type="text" name="First name" value={firstName} handleChange={handleFirstNameChange} disabled={!isEditing} />
                        <FormRow type="text" name="Last name" value={lastName} handleChange={handleLastNameChange}disabled={!isEditing} />
                        <div className="avatar-container">
                            <img src={userAvatar} alt="User Avatar" className="avatar" />
                        </div>
                        <FormRow type="text" name="Role" value={role} handleChange={handleRoleChange}disabled={!isEditing} />
                        <FormRow type="text" name="Email Address" value={email} handleChange={handleEmailChange} disabled={!isEditing} />
                        <span>{<br />}</span>
                        <FormRow type="text" name="Address" value={address} handleChange={handleAddressChange} disabled={!isEditing} />
                        <FormRow type="text" name="City" value={city} handleChange={handleCityChange} disabled={!isEditing}/>
                        <span>{<br />}</span>
                        <FormRow type="text" name="State/Province" value={province} handleChange={handleProvinceChange} disabled={!isEditing} />
                        <FormRow type="text" name="Country" value={country} handleChange={handleCountryChange} disabled={!isEditing}/>
                    </div>
                    <span>{<br />}</span>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{marginRight: "10px"}}>
                    {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save
                    </Button>
                </form>
            </Wrapper>
        </div>
    );
}
