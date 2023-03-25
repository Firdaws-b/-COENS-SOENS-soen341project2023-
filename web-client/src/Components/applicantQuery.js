import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Button, Table } from "react-bootstrap";
//import {CV_query} from './CV_query';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { CandidateContext, CandidateProvider } from "./CandidateContext";
import emailjs from 'emailjs-com';



export default function ApplicantQuery(props) {
    const [applicants, setApplicants] = useState([]);
    const { user, userRole } = useUserAuth();
    const [jobSelected, setJobSelected] = useState(false);
    const navigate = useNavigate();
    const { setSelectedCandidate = () => {} } = useContext(CandidateContext) || {};
    console.log("applicant props",props);
    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        console.log("JOBS:",applicants)

    },[applicants])
    const FetchPost = async () => {
    const q = query(collection(firestore, "Users"), where('uid', 'in', props.data));
    await getDocs(q)
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setApplicants(newData);                
            console.log("applicants",applicants);
        })
        .catch(error => console.log(error.essage))


    }
    async function handleSelectCandidate(jobId, candidateId) {
      const candidateDoc = await getDoc(doc(firestore, "Users", candidateId));
      const candidateEmail = candidateDoc.data().email;

    
      setSelectedCandidate({ jobId: jobId, candidate: candidateId });
      
      const templateEmail = {
        to_email: candidateEmail,
        job_id: jobId,
        to_name: candidateDoc.data().firstName,
        message: "We will communicate with you very soon for further details"
      };
    
      try {
        const response = await emailjs.send(
          "service_9vxnjlo",
          "template_twltnch",
          templateEmail,
          "mvFKgfdK_hI1Vb-Fo"
        );
        console.log("User Notified successfully");
      } catch (error) {
        console.log("ERROR!", error);
      }
    }
    async function handleCVDownload(uid) {
        console.log("DOWNLOAD_UID", uid);
        const storage = getStorage();    
    const Ref = ref(storage, 'resumes/'+ uid + '.pdf');
    
    // Get the download URL
    getDownloadURL(Ref)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log("URL", url);
        window.open(url);
        return url;
      })
      .catch((error) => {
        alert("User has not uploaded a Resume/CV!")
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
    
          case 'storage/unknown':
            // Unknown error occurred
            break;
        }
      });
        //CV_query(uid);
    }
    return (
      <>
          <div>applicantQuery </div>
          <>
              <h1>Applicants</h1>
              <ul>
                  <Table striped bordered hover responsive>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>CV</th>
                              <th>Candidate Selection</th>
                          </tr>
                      </thead>
                      <tbody>
                          {applicants.map((app) => (
                              <tr onClick={() => {}} key={app.id}>
                                  <td>{app.data.firstName} {app.data.lastName}</td>
                                  <td>{app.data.email}</td>
                                  <td><Button onClick={() => handleCVDownload(app.data.uid)}>view/download CV</Button></td>
                                  <td><Button onClick={() => handleSelectCandidate(app.jobId,app.data.uid)}>Select Candidate</Button></td>
                              </tr>
                          ))}
                      </tbody>
                  </Table>
              </ul>
          </>
      </>
  );
  
}
export function ApplicantPage(props) {
  return(
    <CandidateProvider>
      <div>applicantQuery</div>
      <applicantQuery {...props} />
    </CandidateProvider>
  );
}
