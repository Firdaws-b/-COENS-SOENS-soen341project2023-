import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import { Form, Button } from 'react-bootstrap';
import Background from '../assets/office_char.jpg';
import NavBar from "../Components/NavBars/welcomePageNavBar";
import Background3 from '../assets/people.jpg';

import StyledContactForm from "../assets/wrappers/StyledContactForm";

const Result = () => {
  return (
    <p>
      Your request has been sent successfully, we'll get back to you very soon.
    </p>
  );
};

export default function ContactUs() {
  const [showResult, setShowResult] = useState(false);

  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_9vxnjlo',
        'template_39o7c5l',
        e.target,
        'mvFKgfdK_hI1Vb-Fo'
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowResult(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <>
    <NavBar />

      <div style={{ background: `url(${Background3})`, backgroundSize: 'cover', backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '93vh' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0)', padding: '30px' }}>


        <h1 style={{ fontSize: '4rem' ,color: 'white'}}>Contact Us!</h1>
        <h2 style={{ fontSize: '2rem' ,color: 'white',marginBottom: '7rem' }}>We are Here to Listen!</h2>
      </div>

<div style={{ alignItems: 'center'}}>
      <form onSubmit={sendEmail}>

        <div className='form-group' style={{ marginBottom: '1rem', marginTop:'4rem' }}>
          <label htmlFor='name' style={{ fontSize: '2rem', color: 'black' }}>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            name='name'
            required

            placeholder='Enter your full name'
            style={{ width: '160%', maxWidth: '500px' }}
          />
        </div>

        <div className='form-group' style={{ marginBottom: '1rem' }}>
          <label htmlFor='email' style={{ fontSize: '2rem', color: 'black' }}>Email</label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            required

            placeholder='Enter your email address'
            style={{ width: '160%', maxWidth: '500px' }}
          />
        </div>
        <div className='form-group'style={{ marginBottom: '1rem' }}>
          <label htmlFor='subject' style={{ fontSize: '2rem', color: 'black' }}>Subject</label>
          <input
            type='text'
            className='form-control'
            id='subject'
            name='subject'
            required

            placeholder='Enter the subject'
            style={{ width: '160%', maxWidth: '500px' }}
          />
        </div>
        <div className='form-group' style={{ marginBottom: '1rem' }}>
          <label htmlFor='message' style={{ fontSize: '2rem', color: 'black' }}>Message</label>
          <textarea
            className='form-control'
            id='message'
            name='message'
            rows='6'
            required

            placeholder='500 maximum characters'
            style={{ width: '160%', maxWidth: '500px' }}
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Send
        </button>
        {showResult ? <Result /> : null}
      </form>
      </div>
      </div>
  
      </>
  );
}