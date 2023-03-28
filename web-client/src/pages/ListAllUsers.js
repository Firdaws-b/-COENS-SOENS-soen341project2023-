import React,{useEffect, useState} from 'react'
import { useUserAuth } from '../firebase/UserAuthContext';
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';

export const ListAllUsers = () => {
    const { userRole, user } = useUserAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    //const Navigation = useNavigation();
    useEffect(() => {
        FetchPost();
    }, [])
    useEffect(() => {
        //console.log("JOBS:",jobs)

    }, [users])
    const FetchPost = async () => {

        await getDocs(collection(firestore, "Users"))
            .then(querySnapshot => {
                const newData = querySnapshot.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }));
                setUsers(newData);
                //console.log(jobs, newData);
            })
            .catch(error => console.log(error.essage))


    }
    if(userRole === "Admin")
    {
  return (
    <>
    <NavBarProfilePage/>
    <h1>List of all Users</h1>
    <ul>
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(person => <tr onClick={() => { }}
                    key={person.id}><td>{person.data.firstName} {person.data.lastName}</td><td>{person.data.email}</td><td>{person.data.role}</td></tr>)}
            </tbody>
        </table>
    </ul>
</>  )
    }
}
