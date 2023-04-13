import React from "react";
import { useUserAuth } from '../firebase/UserAuthContext';
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage';
import '../Components/NavBars/NavBarProfilePage.css'
import ListAllJobs, { ListJobsFromUID } from '../Components/jobQuery';
import AdminDashboard from "../Components/adminDashboard";
export default function Home() {
  const { userRole } = useUserAuth();

    switch(userRole){
      case "User":
        return (
          <>
            <NavBarProfilePage/>
            <ListAllJobs />
          </>
        );
      case "Employer":
        return (
          <>
            <NavBarProfilePage/>
            <ListJobsFromUID />
          </>
        );
      case "Admin":
        return (
          <>
          <NavBarProfilePage/>
          <AdminDashboard/>
        
          </>
        );
      default:
        
    }
  }

