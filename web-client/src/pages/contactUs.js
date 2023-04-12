import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import NavBar from "../Components/NavBars/welcomePageNavBar";
import Background3 from '../assets/people.jpg';

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
      <div
        style={{
          background: `url(${Background3})`,
          backgroundSize: 'cover',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backgroundBlendMode: 'multiply',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '93vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '10px',
            padding: '30px',
            width: '100%',
            maxWidth: '500px',
          }}
        >
          <h1 style={{ fontSize: '4rem', color: 'black', textAlign: 'center', marginBottom: '1rem' }}>Contact Us!</h1>
          <h2 style={{ fontSize: '1.5rem', color: 'black', textAlign: 'center', marginBottom: '2rem' }}>
            We are here to listen
          </h2>

          <form onSubmit={sendEmail}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="name" style={{ fontSize: '1.2rem', color: 'black' }}>
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ fontSize: '1.2rem', color: 'black' }}>
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
                placeholder="Enter your email address"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="subject" style={{ fontSize: '1.2rem', color: 'black' }}>
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                required
                placeholder="Enter the subject"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="message" style={{ fontSize: '1.2rem', color: 'black' }}>Message</label>
              <textarea
                className='form-control'
                id='message'
                name='message'
                rows='6'
                required
                placeholder='500 maximum characters'
                style={{ width: '100%', maxWidth: '500px' }}
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