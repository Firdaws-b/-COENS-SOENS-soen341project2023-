import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const JobCardList = ({ jobs }) => {
    console.log('Rendering MySavedJobs component');
    return (
        <div>
            <Row>
                {jobs.map((job) => (
                    <Col md={{ span: 10, offset: 1 }} key={job.id}>
                        <Card className="mb-4">
                            <Card.Header>
                                <h5>{job.Job}</h5>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle className="mb-2 text-muted">{job.Company}</Card.Subtitle>
                                <Card.Text className="mb-3">
                                    {job.description}
                                </Card.Text> 
                                <Row>
                                    <Col>
                                        <Card.Text>
                                            location
                                        </Card.Text>
                                    </Col>
                                    <Col className="text-end">
                                        <Button variant="primary">More details</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default JobCardList;
