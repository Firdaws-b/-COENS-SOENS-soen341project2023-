import React, { useEffect, useState } from "react";
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { firestore } from '../firebase/firebase';
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import {  doc, getDoc } from "firebase/firestore";
import '../styles.css'
import JobCardList from "../Components/JobCardList";

const MySavedJobs = () => {
    const { user } = useUserAuth();
    const [savedJobsData, setSavedJobsData] = useState([]);

    useEffect(() => {
        const getSavedJobs = async () => {
            try {
                const userRef = doc(firestore, "Users", user.uid);
                const userDoc = await getDoc(userRef);
    
                if (!userDoc.exists) {
                    console.log("User document not found !");
                    return;
                }
                const savedJobsIds = userDoc.data().savedJobs;
                const jobRefs = savedJobsIds.map(id => doc(firestore, "Postings", id));
                const jobDocs = await Promise.all(jobRefs.map(getDoc));
    
                const newSavedJobsData = jobDocs
                    .filter(doc => doc.exists)
                    .map(doc => ({
                        data: doc.data(),
                        id: doc.id
                    }));
                    newSavedJobsData.forEach(element => {//filters out deleted jobs
                        if(element.data === undefined)
                        {
                            newSavedJobsData.splice(newSavedJobsData.indexOf(element), 1);
                        }
                    });
                setSavedJobsData(newSavedJobsData);
                console.log("is the array empty", newSavedJobsData);
            } catch (error) {
                console.log('Error in getSavedJobs:', error);
            }
        };
        getSavedJobs();
    }, [user.uid]);
    
    return (
        <>
            <NavBarProfilePage />
            <Wrapper className="mt-4">
                <h1>My Saved Jobs</h1>
                <div className="job-card-list-container">
                    <JobCardList jobs={savedJobsData} />
                </div>
            </Wrapper>
        </>
    );
};

export default MySavedJobs;
