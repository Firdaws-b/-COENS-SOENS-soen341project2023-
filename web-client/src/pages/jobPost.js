import React, { useContext, useState, useEffect } from 'react'
import { Button, Form, Card,Container,Row,Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBars/authorizedNavBar';
import { useUserAuth } from '../firebase/UserAuthContext';
import { deleteDoc, collection, doc, FieldValue, arrayUnion, updateDoc, getDoc } from "@firebase/firestore";
import { firestore, auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { DataContext } from '../Components/Contexts/jobPostContext';
import ApplicantQuery from '../Components/applicantQuery';
import SavedJobs from './MySavedJobs';
import Wrapper from "../assets/wrappers/ProfilePageFormPage";
import FormRow from "../Components/FormRow"
import "../styles.css";


export const JobPost = () => {
  const [posting, setPosting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [salary, setSalary] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  const [description, setDescription] = useState("");


  //--------------------------------------------------------
  const navigate = useNavigate();
  const location = useLocation();
  const selectedJob = location.state?.job;
  const { userRole, user } = useUserAuth();

  const { data } = useContext(DataContext);

  console.log("DATA CONTEXT: ", data);
  const id = data.jobby.id;//document name to identify the document that needs to be edited/deleted
  console.log("data ID", id)
  const handleDelete = async () => {
    await deleteDoc(doc(firestore, "Postings", id));
    navigate("/home");
  }
  console.log("UID user: ", user.uid);
  const handleApply = async () => {
    const Ref = doc(firestore, "Postings", id);
    await updateDoc(Ref, {
      applicants: arrayUnion(user.uid)
    })
    navigate("/home");
  }
  const [savedJobs, setSavedJobs] = useState([]);
  const handleSave = async () => {
    if (!id) {
      console.log("THE ID IS NOT DEFINED", id);
      return;
    }
    await updateDoc(doc(firestore, "Users", user.uid), {
      savedJobs: arrayUnion(id),
    });
    setSavedJobs([...savedJobs, data.jobby.data]);
  };
  useEffect(() => {
    const getSavedJobs = async () => {
      const docRef = doc(firestore, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        const savedJobsData = [];
        if (Array.isArray(userData.savedJobs)) {
          for (let i = 0; i < userData.savedJobs.length; i++) {
            const postingRef = doc(firestore, "Postings", userData.savedJobs[i]);
            console.log("checking the posting ref");
            //const postingSnap = await postingRef.get();
            const postingSnap = await getDoc(postingRef);
            if (postingSnap.exists()) {
              savedJobsData.push(postingSnap.data().data);
            }
          }
        }
        setSavedJobs(savedJobsData);
      }
    };
    getSavedJobs();
  }, []);
  //-------------------------------------------------------
  const handleJobChange = (event) => {
    setJob(event.target.value);
  }
  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  }
  const handleCompanyChange = (event) => {
    setCompany(event.target.value);
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // if (user) {
      const uid = user.uid;
      const snapshot = await getDoc(doc(firestore, "Postings", data.jobby.data.jobID));
      console.log("snapshot: ", snapshot.data);
      if (snapshot.exists()) {
        setPosting(snapshot.data().jobID)
        setDescription(snapshot.data().Description)
        setJob(snapshot.data().Job)
        setCompany(snapshot.data().Company)
        setSalary(snapshot.data().Salary)
      } else {
        console.log("User doc missing")
      }
      /*} /*else {
          console.log("User not logged in")
          setPosting(null);
      }*/
      setIsLoading(false);
    });
    console.log("COMPANY IS: ", company);
  }, []);
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    if (!isEditing) {
      return;
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      minimumFractionDigits: 0,
      currency: 'USD',
    });
    const uid = auth.currentUser.uid
    const userRef = doc(firestore, "Postings", data.jobby.data.jobID)
    const updatedUser = {
      Company: company,
      Salary: formatter.format(parseFloat(salary.replace(/\D/g, ''))),
      Job: job,
      Description: description,
      //EmployerUID: user.uid
    }
    console.log("updated info: ", updatedUser);


    await updateDoc(userRef, updatedUser);
    setPosting(updatedUser);
    setIsEditing(false);
  }



if (userRole === "Employer") {
  return (
<>
  <NavBarProfilePage />
  <div className="container my-4">
  <h3 className="card-title">Job Information</h3>
    <div className='row'>
      <div className='col-md-8'>
        <form className='jobPostEmployerForm' onSubmit={handleSaveChanges}>
          <div className='form-group'>
            <FormRow type="text" name="Job" value={job} handleChange={handleJobChange} disabled={!isEditing} />
          </div>
          <div className='form-group'>
            <FormRow type="text" name="Company" value={company} handleChange={handleCompanyChange} disabled={!isEditing} />
          </div>
          <div className='form-group'>
            <FormRow type="text" name="Salary" value={salary} handleChange={handleSalaryChange} disabled={!isEditing} />
          </div>
          <div className='form-group'>
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="5" name="Description" type="text" value={description} onChange={handleDescriptionChange} disabled={!isEditing}></textarea>
          </div>
          <div className='form-group'>
            <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }} disabled={!isEditing}>
              Save
            </Button>
            <Button variant="danger" onClick={handleDelete} style={{ marginRight: "10px" }} disabled={!isEditing}>
              Delete
            </Button>
          </div>
        </form>
      </div>
      <div className='col-md-8 mt-3'>
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Applicants</h5>
          </div>
          <div className='card-body'>
            <ApplicantQuery data={data.jobby.data.applicants}/>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
  );
}

  else if(userRole === "Admin")
  { return (
    <>
      <NavBarProfilePage />
      <div className="job-details-container">
        <div className="job-details">
          <h3>Job Information</h3>
          <div className="form-row">
            <FormRow type="text" name="Job" value={job} handleChange={handleJobChange} disabled={true} />
            <FormRow type="text" name="Company" value={company} handleChange={handleCompanyChange} disabled={true} />
            <FormRow type="text" name="Salary" value={salary} handleChange={handleSalaryChange} disabled={true} />
          </div>
          <div className="form-row">
            <label className="form-label">Description</label>
            <div className="form-input">{description}</div>
          </div>
          <Button variant="primary" onClick={handleDelete} style={{ borderColor: "#cc0000", backgroundColor: "#cc0000", marginTop: "20px" }}>
            Delete
          </Button>
        </div>
        <div className="applicant-details">
          <h3>Applicants</h3>
          <ApplicantQuery data={data.jobby.data.applicants} />
        </div>
      </div>
    </>
  );
}

  else {
    return (
      <>
        <div className="bg-light" style={{ minHeight: "100vh" }}>
      <NavBarProfilePage />
      <Container className="py-5">
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h1 className="mb-4">{data.jobby.data.Job}</h1>
                <h2 className="mb-3">{data.jobby.data.Company}</h2>
                <h3 className="mb-3">{data.jobby.data.Salary}</h3>
                <p className="mb-4">{data.jobby.data.Description}</p>
                <Button
                  variant="primary"
                  onClick={handleApply}
                  disabled={data.jobby.data.applicants?.includes(user.uid)}
                  className="me-3"
                >
                  {data.jobby.data.applicants?.includes(user.uid)
                    ? "Applied"
                    : "Apply Now"}
                </Button>
                <Button

                  onClick={handleSave}
                >
                  Save
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
      </>
    )
  }
}