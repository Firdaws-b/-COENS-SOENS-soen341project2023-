import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import { useUserAuth } from "../firebase/UserAuthContext";
import NavBar from "../Components/NavBars/welcomePageNavBar";
import {firestore} from "../firebase/firebase";
import { doc, setDoc } from "@firebase/firestore";

import Background from '../assets/office_char.jpg';

const EmployerSignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  let ting = "";
  const handleSubmit = async (e) => { //handles firebaseUI authentication
    e.preventDefault();
    setError("");
    try {
      ting = await signUp(email, password);
      handleSave();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSave = async(e) => {//handles user storage in firestore
    const ref = doc(firestore, "Users", ting.user.uid);
  
      let data = {
          email: email,
          companyName: companyName,
          role: "Employer",
          vision: "default",
          sector: "default",
          location: "default",
          uid: ting.user.uid
      };
      setDoc(ref, data)
      .then(() => {
          console.log("Document has been added successfully");
      })
      .catch(error => {
          console.log(error);
      })
  }

  return (
    <>
    <NavBar/>
      <div style={{  background: `url(${Background})`,  backgroundSize: 'cover' ,backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div className="p-4 box" style={{ padding: '20px', }}>

          <h2 className="mb-3">Create an account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="companyName"
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="Submit">
                Sign up
              </Button>

            </div>
          </Form>
          <div className="p-4 box mt-3 text-center">Already have an account? <Link to="/sign-in">Log In</Link>
</div>
        </div>


</div>

    </>
  );
};

export default EmployerSignUp;