import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Button } from "react-bootstrap";
//import {CV_query} from './CV_query';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


export default function ApplicantQuery(props) {
    const [applicants, setApplicants] = useState([]);
    const { user, userRole } = useUserAuth();
    const [jobSelected, setJobSelected] = useState(false);
    //const {data, setData} = useContext(DataContext);
    const navigate = useNavigate();
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
    async function handleCVDownload(uid) {
        console.log("DOWNLOAD_UID", uid);
        const storage = getStorage();    
    //const uid = user.uid;
    const Ref = ref(storage, 'resumes/'+ uid + '.pdf');
    
    // Get the download URL
    getDownloadURL(Ref)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log("URL", url);
        window.open(url);
        //navigate(url);
        return url;
        // Or inserted into an <img> element
        //const img = document.getElementById('myimg');
        //img.setAttribute('src', url);
      })
      .catch((error) => {
        alert("User has not uploaded a Resume/CV!")
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
    
    
          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
        //CV_query(uid);
    }
  return (
    <>
    <div>applicantQuery</div>
    <>
        <h1>Applicants</h1>
        <ul>
            <table class="styled-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>CV</th>
                </tr>
                </thead>
                <tbody>
            {applicants.map(app => <tr onClick={() => {}}//TBD whether it redirects to a new page
            key={app.id}><td>{app.data.firstName} {app.data.lastName}</td><td>{app.data.email}</td><td><a><Button onClick={() => handleCVDownload(app.data.uid)}>view/download CV</Button></a></td></tr>)}
            </tbody>
            </table>
        </ul>
        </>
    </>
  )
}
