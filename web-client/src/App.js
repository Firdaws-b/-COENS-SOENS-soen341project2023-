//import './App.css';
import { useEffect } from 'react';
import NavBar from './Components/NavBars/welcomePageNavBar';
import { Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/home';
import { UserAuthContextProvider } from "./firebase/UserAuthContext";
import ProtectedRoute from "./firebase/protectedRoute";
import { RoleSelection } from './pages/roleSelection';
import EmployerSignUp from './pages/employerSignUp'
//import Welcome from './pages/Welcome';

//import api_key from './secrets'

//nst API_URL = '';//FireBase db api key goes here

const App = () => {
//console.log(api_key);
//console.log(window.location)
  useEffect(() => {
//should learn this to retrieve data
  },[]);

  return (

    <>

  <div className="App">

    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/sign-in" element={<SignIn/>} />
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/role-selection" element={<RoleSelection/>} />
        <Route path="/employer-sign-up" element={<EmployerSignUp/>} />
      </Routes>
      </UserAuthContextProvider>

  </div>

    </>  );};

export default App;
