import React, {useContext, useState, useEffect} from 'react'
import { Button, Form } from 'react-bootstrap';
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
  console.log("UID: ", user.uid);
  const handleApply = async () => {
    const Ref = doc(firestore, "Postings", id);
    await updateDoc(Ref, {
      applicants: arrayUnion(user.uid)
    })
    navigate("/home");
  }
  const [savedJobs, setSavedJobs] = useState([]);
  const handleSave = async () => {
    if(!id){
      console.log("THE ID IS NOT DEFINED", id);
      return;
    }
    await updateDoc(doc(firestore,"Users",user.uid),{
      savedJobs:arrayUnion(id),
    });
    setSavedJobs([...savedJobs,data.jobby.data]);
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
    Salary: formatter.format(parseFloat(salary.replace(/\D/g,''))),
    Job: job,
    Description: description,
    //EmployerUID: user.uid
  }
  console.log("updated info: ", updatedUser);


  await updateDoc(userRef, updatedUser);
  setPosting(updatedUser);
  setIsEditing(false);
}



  if(userRole === "Employer")
  {
    return(
      <>
        <NavBarProfilePage />
      <div>
                <form className='jobPostEmployerForm' onSubmit={handleSaveChanges}>
                    <h3>Job Information</h3>
                      <div className='form-center'>
                        <FormRow type="text" name="Job" value={job} handleChange={handleJobChange} disabled={!isEditing} />
                          <FormRow type="text" name="Company" value={company} handleChange={handleCompanyChange} disabled={!isEditing} />
                          <FormRow type="text" name="Salary" value={salary} handleChange={handleSalaryChange} disabled={!isEditing} />
                        <FormRow type="text" name="Description" value={description} handleChange={handleDescriptionChange} disabled={!isEditing} />

                    </div>
                      <span>{<br />}</span>
                    <Button variant="primary" onClick={() => setIsEditing(!isEditing)} style={{ marginRight: "10px" }}>
                        {isEditing ? "Cancel" : "Edit"}
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} style={{ marginRight: "10px" }}>
                        Save
                    </Button>
                    <Button variant="primary" onClick={handleDelete} style={{ marginRight: "10px" }}>
                      Delete
                      </Button>

                </form>
        </div>
    <div>
      <ApplicantQuery data={data.jobby.data.applicants}/>
    </div>
        </>
    )
  }

  else if(userRole === "Admin")
  {
    return(
      <>
        <NavBarProfilePage />
      <div>
                <form className='jobPostEmployerForm' onSubmit={handleSaveChanges}>
                    <h3>Job Information</h3>
                      <div className='form-center'>
                        <FormRow type="text" name="Job" value={job} handleChange={handleJobChange} disabled={true} />
                          <FormRow type="text" name="Company" value={company} handleChange={handleCompanyChange} disabled={true} />
                          <FormRow type="text" name="Salary" value={salary} handleChange={handleSalaryChange} disabled={true} />
                        <FormRow type="text" name="Description" value={description} handleChange={handleDescriptionChange} disabled={true} />

                    </div>
                      <span>{<br />}</span>
                    <Button variant="primary" onClick={handleDelete} style={{  borderColor:'#cc0000',backgroundColor:'#cc0000', marginRight: "10px" }}>
                      Delete
                      </Button>

                </form>
        </div>
    <div>
      <ApplicantQuery data={data.jobby.data.applicants}/>
    </div>
        </>
    )
  }

  else {
    return (
      <>
        <NavBarProfilePage />
        <div>Job Post</div>
        <h1>
          {data.jobby.data.Job}
        </h1>
        <h2>
          {data.jobby.data.Company}
        </h2>
        <h3>
        {data.jobby.data.Salary}
        </h3>
        <h4>
          {data.jobby.data.Description}
        </h4>
        <Button onClick={handleApply}>Apply</Button>
        <Button onClick={handleSave} style={{ marginLeft: "20px" }}>Save</Button>
      </>
    )
  }
}