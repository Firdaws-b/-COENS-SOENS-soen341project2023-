import React from 'react'
import { Button } from 'react-bootstrap'
import NavBar from '../Components/NavBars/welcomePageNavBar'
import { useNavigate} from 'react-router-dom';

export const RoleSelection = () => {
    const navigate = useNavigate();

    const navigateToUserSignUp = () => {
        navigate('/sign-up');
      };
    
      const navigateEmployerSignUp = () => {
        navigate('/employer-sign-up');
      };
  return (
    <>
    <NavBar/>
    <div>roleSelection</div>
    <div className='role-select'>
        <Button onClick={navigateToUserSignUp}>Job Seeker</Button>
        <Button onClick={navigateEmployerSignUp}>Employer</Button>
    </div>
    </>
  )
}
