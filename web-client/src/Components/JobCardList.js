import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import "../styles.css";

const JobCardList = ({ jobs }) => {
    return (
        <div>
            <Row xs={1} md={2} className="g-4">
                {jobs.map((job) => (
                    <Col key={job.id}>
                        <Card className="job-card">
                            <Card.Header className="job-card-header">
                                <img src={job.CompanyLogo} alt={job.Company} className="job-card-logo" />
                                <span className="job-card-company">{job.Company}</span>
                            </Card.Header>
                            <Card.Body className="job-card-body">
                                <Card.Title className="job-card-title">{job.Job}</Card.Title>
                                <Card.Text className="job-card-text">
                                    Remote or OnSite or Hybrid
                                </Card.Text>
                                <Button variant="primary" className="job-card-button">
                                    More details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default JobCardList;
