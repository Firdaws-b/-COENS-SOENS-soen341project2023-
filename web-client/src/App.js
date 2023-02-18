//import './App.css';
import React, { useEffect, useContext, useState } from 'react';
import NavBar from './Components/NavBars/welcomePageNavBar';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/home';
import { UserAuthContextProvider, useUserAuth } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import { RoleSelection } from './pages/roleSelection';
import EmployerSignUp from './pages/employerSignUp';
import { doc, getDoc } from "firebase/firestore";
import { firestore } from './firebase/firebase';
//import Welcome from './pages/Welcome';

//import api_key from './secrets'

//nst API_URL = '';//FireBase db api key goes here
export const UserContext = React.createContext("");

const App = () => {
  const { user } = useUserAuth();
  const [error, setError] = useState("");
//console.log(api_key);
//console.log(window.location)
  useEffect(() => {
//should learn this to retrieve data
  },[]);
  //UIDQuery("50OUWCBuXzc2dumW3zWkOYdIZdm2");

function nullcheck(){
  if(user !== null && user !== undefined){
    console.log("UID",user.uid);
    return UIDQuery(user.uid);
  }
  else{
    return "";
  }
}

  return (

    <>
  <div className="App">

    <UserAuthContextProvider>
    <UserContext.Provider value = {nullcheck()}>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/role-selection" element={<RoleSelection/>} />
        <Route path="/employer-sign-up" element={<EmployerSignUp/>} />
      </Routes>
      </UserContext.Provider>
      </UserAuthContextProvider>

  </div>

    </>  );};

export default App;

async function UIDQuery(userID){
  const docRef = doc(firestore, "Users", userID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {   
    //console.log("Document data:", docSnap.data());
    console.log("UID",docSnap.data().uid);
    console.log("email",docSnap.data().email);
    console.log("Role",docSnap.data().role);

  } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}
class User {
  constructor(email, firstName, lastName, userID){
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.uid = userID;
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
      </div>
    );
  }
}