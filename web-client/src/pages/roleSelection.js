import React from 'react'
import { Button } from 'react-bootstrap'
import NavBar from '../Components/NavBars/welcomePageNavBar'
import { useNavigate} from 'react-router-dom';
import Background from '../assets/office_char.jpg';

export const RoleSelection = () => {
    const navigate = useNavigate();

    const navigateToUserSignUp = () => {
        navigate('/sign-up');
      };
    
      const navigateEmployerSignUp = () => {
        navigate('/employer-sign-up');
      };

      const backgroundStyle = {
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundColor: 'blue',
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '93.4vh',
      };

      const textDivStyle = {
        backgroundColor: 'transparent',
        color: 'black',
        textAlign: 'center',
        fontSize: '2rem',
        padding: '1rem',
        border: 'none'
      };



  return (
    <>
     <NavBar/>
     
     
     <div style={backgroundStyle}>
     
     <div style={textDivStyle}>
        Please select what describes you the best
      </div>
      
     <div className='role-select'>
        <Button onClick={navigateToUserSignUp}>Job Seeker</Button>
        <Button onClick={navigateEmployerSignUp}>Employer</Button>
    </div>
   
    </div>
    </>
    
  )
}
