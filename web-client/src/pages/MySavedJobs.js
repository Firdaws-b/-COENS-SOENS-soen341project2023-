import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Form, Alert, Carousel } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { auth, firestore } from '../firebase/firebase';
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
//import { doc } from "@firebase/firestore";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

import { storage } from "../firebase/firebase";
import JobCardList from "../Components/JobCardList";

const MySavedJobs = () => {
    // console.log('Rendering MySavedJobs component');
    const { user } = useUserAuth();
    const [savedJobsData, setSavedJobsData] = useState([]);
    useEffect(() => {
        const getSavedJobs = async () => {
            try {
                console.log('getSavedJobs called');
                const userRef = doc(firestore, "Users", user.uid);
                //console.log('BEFORE USERDOC: ');
                // const userDoc = await userRef.get();
                //getDoc(doc(firestore, "Users", uid))
                const userDoc = await getDoc(doc(firestore, "Users", user.uid));
                //console.log('AFTER USERDOC: ');
                if (!userDoc.exists) {
                    console.log("User document not found !");
                    return;
                }
                //console.log(userRef.path)
                //console.log('user: ',user);
                const savedJobsIds = userDoc.data().savedJobs;
                const newSavedJobsData = [];
                //const savedJobsData = [];
                console.log(savedJobsIds.length)
                for (let i = 0; i < savedJobsIds.length; i++) {
                    const jobRef = doc(firestore, "Postings", savedJobsIds[i]);
                    //getDocs(collection(firestore, "Postings"))
                    const jobDoc = await getDoc(doc(firestore, "Postings", savedJobsIds[i]));
                    if (jobDoc.exists) {
                        const jobData = jobDoc.data();
                        newSavedJobsData.push({
                            Job: jobData.Job,
                            Company: jobData.Company,
                        });
                    }
                }

                setSavedJobsData(newSavedJobsData);
                console.log(savedJobsData);
            } catch (error) {
                console.log('Error in getSavedJobs:', error);
            }
        };
        getSavedJobs();
    }, [user, savedJobsData]);

    return (
        <>
            <NavBarProfilePage />
            <Wrapper className="mt-4">
                <h2>My Saved Jobs</h2>
                <JobCardList jobs={savedJobsData} />
            </Wrapper>
        </>
    );
};
export default MySavedJobs;
