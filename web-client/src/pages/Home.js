
import NavBar from '../Components/NavBars/authorizedNavBar';
import {Button} from 'react-bootstrap';
import ListJobs from '../Components/jobQuery';
export default function Home() {
  
  return (
    <>
    <NavBar/>
    <div>Home</div>
    <ListJobs />
    </>
  )
}

