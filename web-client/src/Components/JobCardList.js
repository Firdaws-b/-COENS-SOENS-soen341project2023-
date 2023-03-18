import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const JobCardList = ({ jobs }) => {
    console.log('Rendering MySavedJobs component');
    return (
        <div>
            <Row>
                {jobs.map((job) => (
                    <Col md={{ span: 7, offset: 1 }} key={job.id}>
                        <Card className="mb-3">
                            <Card.Header>JobTitle/Position</Card.Header>
                            <Card.Body>
                                <Card.Title>{job.Job}</Card.Title>
                                <Card.Text>
                                job.Copmany
                                <span></span>
                                Remote or OnSite or Hybrid
                                </Card.Text> 
                                <Button variant="primary">More details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default JobCardList;