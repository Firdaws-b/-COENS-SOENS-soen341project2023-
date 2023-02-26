import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import navigationBar_welcome from '../Components/NavBars/welcomePageNavBar';
import Background from '../assets/office_char.jpg';
import NavBar from "../Components/NavBars/welcomePageNavBar";

const Welcome = () => {
  return (
    <>
    <NavBar/>
      <div 
        style={{  
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover' ,
          backgroundColor: 'blue', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          width: '100vw' 
        }}
      >
        <div className="p-4 box" style={{  padding: '30px', }}>
          <div className="Welcome test section"></div>    
          <div className="Home-text-section">
            <h1 className="primary-heading">
              Your journey starts here...
            </h1> 
            <p className='primary intro text' >
              Are you a student looking for your dream job? 
              A recruiter looking for hidden talents?
              ...Sign up now!!...Hurry! 
            </p>
          </div>
          <h2 className="intro text">Log</h2>
        </div>
      </div>
    </>
  );
};

export default Welcome;