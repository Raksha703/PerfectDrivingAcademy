import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {Loader } from "../components/components.js";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const Login= () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      
      const response = await axios.post(`${BACKEND_BASE_URL}/user/login`, formData, {withCredentials: true});
      console.log(response.cookies)
      toast.success("Login successful!", {
        autoClose: 2000
      });
      setTimeout(() => {
        window.location.reload()        
      }, 2000);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed. Please try again.", {
        autoClose: 2000
      });
    } finally {      
      setLoading(false)
    }
  };

  return (
    <Container className="mt-5 mb-5">
    
        <Row className="justify-content-center">
          <Col md={6}>
          <Card className="p-4 shadow-lg rounded">
            <h2 className="mb-4 text-center">Login</h2>
            {
      loading ?
      <Loader />
      :
      (
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <div className="text-center mt-3 mb-3">
                <span>Don't have an account? </span>
                <Link to="/register">Register here</Link>
              </div>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>)}
          </Card>
          </Col>
        </Row>
      
    </Container>
  );
};

export default Login;
