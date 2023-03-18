import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Form, Alert, Carousel } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { auth, firestore } from '../firebase/firebase';
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import { doc } from "@firebase/firestore";
import { storage } from "../firebase/firebase";
import JobCardList from "../Components/JobCardList";

const MySavedJobs = () => {
    console.log('Rendering MySavedJobs component');
    const { user } = useUserAuth();
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        const getSavedJobs = async () => {
            const docRef = doc(firestore, "Users", user.uid);
            const docSnap = await docRef.get();
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const savedJobsData = [];
                for (let i = 0; i < userData.savedJobs.length; i++) {
                    const postingRef = doc(firestore, "Postings", userData.savedJobs[i]);
                    const postingSnap = await postingRef.get();
                    if (postingSnap.exists()) {
                        savedJobsData.push(postingSnap.data());
                    }
                }
                console.log("Tesgin my savedJob page");
                setSavedJobs(savedJobsData);
            }
        };
        getSavedJobs();
    }, [user]);

    return (
        <>
            <NavBarProfilePage />
            <Wrapper>
                <h1>My Saved Jobs</h1>
                {savedJobs.length === 0 ? (
                    <Alert variant="warning">No saved jobs yet!</Alert>
                ) : (
                    <h1>Welcome</h1>
                )}
            </Wrapper>
        </>
    );
};
export default MySavedJobs;
