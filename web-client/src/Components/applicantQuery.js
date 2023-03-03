import { createContext, useContext, useEffect, useState } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import { Button } from "react-bootstrap";

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
            key={app.id}><td>{app.data.firstName} {app.data.lastName}</td><td>{app.data.email}</td><td><Button>view/download CV</Button></td></tr>)}
            </tbody>
            </table>
        </ul>
        </>
    </>
  )
}
