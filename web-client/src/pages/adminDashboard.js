import { Link } from "react-router-dom";
import { Form, Alert, Carousel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Background from '../assets/office_char.jpg';
import NavBar from "../Components/NavBars/welcomePageNavBar";


const adminDashboard = () => {

    return (
      <>
           <NavBar/>

           <div style={{  background: `url(${Background})`,  backgroundSize: 'cover' ,backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

           </div>
         <div>The amzing Admin is here now</div>
        </>
)};

export default adminDashboard;

        