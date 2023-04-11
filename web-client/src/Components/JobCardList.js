import react from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "./Contexts/jobPostContext";
import { useContext } from "react";
import { useUserAuth } from "../firebase/UserAuthContext";
//import {Checkmark} from 'react-checkmark';
const JobCardList = ({ jobs, handleJobCardClick }) => {
    const navigate = useNavigate();

    const [selectedJob, setSelectedJob] = useState(null);
    const { data, setData } = useContext(DataContext);
    const { user, userRole } = useUserAuth();
    const [fromSavedJobs, setFromSavedJobs] = useState(false); // Define fromSavedJobs state variable
    const handleMoreDetails = (jobData) => {
        setData({ jobby: jobData })
        setSelectedJob(true);
        navigate("/job-post");
    };
    return (
        <div>
            <Row xs={1} md={2} className="g-4">
                {jobs.map((job, index) => (
                    <Col key={job.id}>
                        <Card className="job-card">
                            <Card.Header className="job-card-header">
                                <img
                                    src={job.data.CompanyLogo}
                                    alt={job.data.Company}
                                    className="job-card-logo"
                                />
                                <span className="job-card-company">{job.data.Company}</span>
                            </Card.Header>
                            <Card.Body className="job-card-body">
                                <Card.Title className="job-card-title">{job.data.Job}</Card.Title>
                                <Card.Text className="job-card-text">
                                    Remote or OnSite or Hybrid
                                </Card.Text>
                                <Button
                                    onClick={() => handleMoreDetails(job)}
                                    variant="primary"
                                    className="job-card-button"
                                >
                                    More details
                                </Button>
                                {job.data.applicants && job.data.applicants.includes(user.uid) ? (<Button className="btn btn-success" style={{ marginLeft: "10px", pointerEvents: "none", opacity: 1 }}>
                                    Applied
                                </Button>
                                ) : (
                                    null
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedJob && (
                <Navigate to="/job-post" state={{ job: selectedJob, fromSavedJobs: fromSavedJobs }} />
            )}
        </div>
    );
};

export default JobCardList;