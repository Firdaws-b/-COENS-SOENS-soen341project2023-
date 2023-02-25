import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from '../firebase/firebase';
import { useUserAuth } from "../firebase/UserAuthContext";


 export default function ListJobs(){
    const [jobs, setJobs] = useState([]);

    useEffect(()=>{
        FetchPost();
    }, [])
    useEffect(() => {
        console.log("JOBS:",jobs)

    },[jobs])
    const FetchPost = async () => {

    await getDocs(collection(firestore, "Postings"))
        .then(querySnapshot=>{               
            const newData = querySnapshot.docs.map(doc => ({data:doc.data(),
            id:doc.id }));
            setJobs(newData);                
            console.log(jobs, newData);
        })
   

    }

 }