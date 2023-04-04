import React from 'react';
import NavBar from "../Components/NavBars/welcomePageNavBar";
import Background2 from '../assets/our_services.png';
import Background1 from '../assets/book_background.jpg';
import Background from '../assets/office_char.jpg';
import Background3 from '../assets/people.jpg';

const Services = () => {
  return (
    <>
      <NavBar />
     
    
      <div style={{ background: `url(${Background3})`, backgroundSize: 'cover', backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '93vh' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0)', padding: '30px' }}>
        <h1 style={{ fontSize: '6rem' ,color: 'white'}}>Our Services</h1>
      </div>


      </div>
    </>
  );
}

export default Services;
