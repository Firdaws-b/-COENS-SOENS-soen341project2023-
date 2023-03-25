import react from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../styles.css";
import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DataContext } from "./jobPostContext";
import {useContext} from "react";
const JobCardList = ({ jobs }) => {
    const navigate = useNavigate();
    
    const [selectedJob, setSelectedJob] = useState(null);
    const { data, setData } = useContext(DataContext);
    const [fromSavedJobs, setFromSavedJobs] = useState(false); // Define fromSavedJobs state variable
    console.log("CHECKING THE ARRAY OF SAVED JOBS: ", jobs);

    const handleMoreDetails = (jobData) => {
        setData({jobby: jobData})
        setSelectedJob(true);
        console.log("Is this function called ???", jobData.id);
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