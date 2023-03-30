import React from 'react'
import ListAllJobs from '../Components/jobQuery'
import NavBarProfilePage from '../Components/NavBars/NavBarProfilePage'
//This page is ONLY because I am too lazy to try and figure out how to re-render the home page for admins to show the jobs. ~Julien :)
export const AdminJobView = () => {
  return (
        <>
        <NavBarProfilePage/>
        <ListAllJobs/>
        </>
    )
}
