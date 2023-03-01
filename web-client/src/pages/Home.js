import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import '../Components/NavBars/NavBarProfilePage.css'
import ListAllJobs, { ListJobsFromUID } from '../Components/jobQuery';
export default function Home() {
  const [error, setError] = useState("");
  const { userRole } = useUserAuth();
  //const navigate1 = useNavigate();


    //const navigate = useNavigate();

    if(userRole === "User")
    {
    return (
      <>
      <NavBarProfilePage/>
        <div>Home</div>
        <ListAllJobs />

      </>
    );
    }
    else if(userRole === "Employer")
    {
    return (
      <>
      <NavBarProfilePage/>
        <div>Your job postings</div>
        <ListJobsFromUID />

      </>
    );
    }
  }

