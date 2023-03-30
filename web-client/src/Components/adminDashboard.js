import { Link } from "react-router-dom";
import { Button, Card, Row, Col } from "react-bootstrap";
import Background from '../assets/office_char.jpg';
import NavBar from "./NavBars/welcomePageNavBar";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const navigate = useNavigate();

  const toUserList = (jobData) => {
    //setData({ jobby: jobData });
    //setJobSelected(true);
    navigate('/list-users');
}
  const toJobList = (jobData) => {
    //setData({ jobby: jobData });
    //setJobSelected(true);
    navigate('/admin-job-view');
}

  return (
    <>
      <div style={{ background: `url(${Background})`, backgroundSize: 'cover', backgroundColor: 'blue', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(255, 255, 255, 0)', padding: '10px' }}>
        <h2 style={{ fontSize: '2rem' }}>Welcome to the Admin Dashboard</h2>
      </div>

        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="mb-3">
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <Card.Title>Latest Updates and Events</Card.Title>
                <Card.Text>
                  Here are the latest updates and events on the platform, including new features, bug fixes, and upcoming events.
                </Card.Text>
                <Button variant="primary">View All</Button>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Header>Users</Card.Header>
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  Here you can manage all the users on the platform, including adding new users, editing existing ones, and removing them if needed.
                </Card.Text>
                <Button onClick={toUserList} variant="primary">View All Users</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="mb-3">
              <Card.Header>Job Posts</Card.Header>
              <Card.Body>
                <Card.Title>View all job posts</Card.Title>
                <Card.Text>
                  Here, you can view and manage all active job postings.
                </Card.Text>
                <Button onClick = {toJobList} variant="primary">View All Postings</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    </>
  );
};

export default AdminDashboard;
