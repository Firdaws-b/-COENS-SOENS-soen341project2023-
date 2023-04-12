import React,{useEffect, useState, useContext} from 'react'
import { useUserAuth } from '../firebase/UserAuthContext';
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import { UserDataContext } from '../Components/Contexts/userListContext';

export const ListAllUsers = () => {
    const { userRole } = useUserAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { setUserData } = useContext(UserDataContext);
    useEffect(() => {
        FetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

            users.forEach(element => {
                
            });

    }
    const toUserView = (personData) => {
        setUserData({ person: personData });
        navigate('/admin-user-view');
    }
    const determineName = (personData) => {
        if(personData.data.role === "Employer")
        {
            return personData.data.companyName;
        }
        else
        {
            return personData.data.firstName.concat( " ".concat(personData.data.lastName));
        }

    }
    if(userRole === "Admin")
    {
return (
    <>
    <NavBarProfilePage/>
    <h1>List of all Users</h1>
    <ul>
        <table className="styled-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map(person => <tr onClick={() => {toUserView(person) }}
                    key={person.id}><td>{determineName(person)}</td><td>{person.data.email}</td><td>{person.data.role}</td></tr>)}
            </tbody>
        </table>
    </ul>
</>  )
    }
}
