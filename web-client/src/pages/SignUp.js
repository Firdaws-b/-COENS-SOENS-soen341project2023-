import React from 'react'
import { useRef, useState } from "react"
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useAuth } from '../AuthContext'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
   // const { signup } = useAuth();

 /*   function handleSubmit(e) {
        e.preventDefault()

        signup(emailRef.current.value, passwordRef.current.value, passwordConfirmationRef.current.value)
    }*/

  return (
            <Container className="d-flex align-items-center justify-content-center w-100"
            style = {{minHeight: "100vh", maxWidth: "400px" }}>
            <Card>
                <Card.Body>
                    <h2 className = "text-center mb-4">Sign Up</h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirmation">
                            <Form.Label>password-confirmation</Form.Label>
                            <Form.Control type="password-confirmation" ref={passwordConfirmationRef} required />
                        </Form.Group>
                        <Button className="w-100" type="submit"
                        style = {{marginTop: "10px"}}>Sign Up</Button>
                    </Form>
                </Card.Body>
                <div classname="w-100 text-center mt-2">
                    Already have an account? Login
                </div>
            </Card>
            </Container>
    )
}
