import React from 'react';
import NavBar from "../Components/NavBars/welcomePageNavBar";
import Background3 from '../assets/people.jpg';

const Services = () => {
  return (
    <>
      <NavBar />
     
    
      <div style={{ background: `url(${Background3})`, backgroundSize: 'cover', backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '93vh' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0)', padding: '30px' }}>
        <h1 style={{ fontSize: '6rem' ,color: 'white'}}>Our Services</h1>
      </div>
      <div style={{
      display: 'flex',
      margin: 'auto auto',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '30px',
        borderRadius: '30px',
        width: '40%',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.3)'
      }}>
        <h1>Job Postings</h1>
        <p>Our website allows employers to post about their open positions, and candidates to apply to these jobs.</p>
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '30px',
        borderRadius: '20px',
        width: '40%',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.3)'
      }}>
        <h1>Resume Building</h1>
        <p >We help candidates create and improve their resumes to make them stand out to potential employers.</p>
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '30px',
        borderRadius: '20px',
        width: '40%',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.3)'
      }}>
        <h1>Interview Preparation</h1>
        <p>We offer tips and resources to help candidates prepare for job interviews and make a great impression on potential employers.</p>
      </div>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        margin: '30px',
        borderRadius: '20px',
        width: '40%',
        boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.3)'
      }}>
        <h1>Recruitment Services</h1>
        <p>We also offer recruitment services to help employers find the right candidates for their open positions.</p>
      </div>
    </div>
      </div>
    </>
  );
}
export default Services;
