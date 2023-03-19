import React, { useState, useRef } from "react";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { firestore} from "../firebase/firebase";
import { useUserAuth } from "../firebase/UserAuthContext";
import { addDoc, collection, getDoc } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import NavBar from '../Components/NavBars/authorizedNavBar'
import { useNavigate } from 'react-router-dom';
export const CreateJobListing = () => {
  const ref = collection(firestore, "Postings");
  const [jobTitle, setJobTitle] = useState("");
  const [error, setError] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { companyName, user } = useUserAuth();
  const [companyLogo, setCompanyLogo ] = useState("");


  const navigateHome = () => {
    navigate('/home');
  };
  const handleSubmit = async (e) => { //handles firebaseUI authentication
    e.preventDefault();
    setError("");
    try {
      handleSave();
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  }
  const handleSave = async (e) => {
    //e.preventDefault();//so page doesn;t refresh when save button is clicked
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    const userDocRef = doc(firestore,"Users",user.uid);
    const userDocSnapShot = await getDoc(userDocRef);
    if (userDocSnapShot.exists()){
      const companyLogo = userDocSnapShot.data().logoUrl;
      console.log("LOGO OF THE COMPANY",companyLogo);
      setCompanyLogo(companyLogo);
      let data = {
        Company: companyName,
        Salary: formatter.format(salary),
        Job: jobTitle,
        Description: description,
        CompanyLogo: companyLogo,
        EmployerUID: user.uid//used to only display postings from active employer
      };
      addDoc(ref, data);
      //data = {...data,CompanyLogo:companyLogo};
    }
    else{
      console.log("User document not found");
    }
    //await addDoc(ref,data);
    // let data = {
    //   Company: companyName,
    //   Salary: formatter.format(salary),
    //   Job: jobTitle,
    //   Description: description,
    //   CompanyLogo: companyLogo,
    //   EmployerUID: user.uid//used to only display postings from active employer
    // };
    // //console.log("data", companyName);
    // console.log("this is the Company LOGO URL",companyLogo);
    // try {
    //   addDoc(ref, data);

    // } catch (e) {
    //   console.log(e);
    // }
  }

  return (
    <>
      <NavBar />
      <h2 className="mb-3" >Create Job Posting</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="jobTitle"
            placeholder="Job Title"
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="salary"
            placeholder="Salary"
            onChange={(e) => setSalary(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control as="textarea" rows="5"
            type="description"
            placeholder="Job Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button type="Submit">Create</Button>
      </Form>


    </>

  );

};

export default CreateJobListing;