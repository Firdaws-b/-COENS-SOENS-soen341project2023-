import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import '../Components/NavBars/NavBarProfilePage.css'
export default function Dashboard() {
  const [error, setError] = useState("");
  const { logOut } = useUserAuth();
  const navigate1 = useNavigate();

  const handleLogOut = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logOut();
      navigate1("/");
    } catch (err) {
      setError(err.message);
    }
  };
    const navigate = useNavigate();
    function handleProfilePage() {
      console.log('Navigating to ', '/MyProfile');
      navigate('/MyProfile');
    }

    return (
      <>
      <NavBarProfilePage/>
        <div>Dashboard</div>
        <Button variant="primary" onClick={handleLogOut}>
          Log Out
        </Button>
        <Button variant="primary" onClick={handleProfilePage}>
          Profile Page
        </Button>

      </>
    );
  }

