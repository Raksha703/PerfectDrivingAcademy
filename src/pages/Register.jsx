import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal, Image } from 'react-bootstrap';
import { Loader, TermsAndConditions } from "../components/components";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import OTPInput from "otp-input-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    address: '',
    contactNumber: '',
    vehicleToLearn: '',
    termsAccepted: false,
    role: 'Candidate',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
    age: 0,
    experience: '',
    specialties: '',
    license: '',
    bio: ''
  });

  const [showTerms, setShowTerms] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpGenerated, setOtpGenerated] = useState('');

  const sendOtpToEmail = async () => {
    if (!formData.email) {
      return toast.error("Please enter an email first.", { autoClose: 2000 });
    }
    try {
      setLoading(true);
      const url = `${BACKEND_BASE_URL}/user/sendOtp`;
      const { data: res } = await axios.post(url, { email: formData.email });
      setLoading(false);
      setOtpGenerated(res.otp);
      toast.success("OTP sent to your email!", { autoClose: 2000 });
    } catch (error) {
      setLoading(false);
      console.error('Error sending OTP:', error);
      toast.error("Failed to send OTP.", { autoClose: 2000 });
    }
  };

  const verifyOtp = () => {
    console.log(otpGenerated, otp)
    if (otpGenerated === otp) {
      toast.success("OTP verified successfully!", { autoClose: 2000 });
    } else {
      toast.error("Invalid OTP. Please try again.", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      return toast.error("You must accept the Terms and Conditions.", { autoClose: 2000 });
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match.", { autoClose: 2000 });
    }

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === "avatar" && val) {
        submissionData.append('avatar', val);
      } else {
        submissionData.append(key, val);
      }
    });

    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_BASE_URL}/user/register`, submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setLoading(false);
      toast.success("Registration successful! Please wait till you get approval", { autoClose: 2000 });
      setTimeout(() => window.location.reload(), 2000);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.error("Registration error:", err);
      toast.error("Registration failed. Please try again.", { autoClose: 2000 });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const isInstructor = formData.role === 'Instructor';

  return (
    <Container className="my-5 p-4 shadow rounded bg-light">
    <h2 className="text-center mb-4">User Registration</h2>
      {loading ? <Loader /> : (
        <>
          
          <Form onSubmit={handleSubmit}>
            {/* Role */}
            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select name="role" value={formData.role} onChange={handleChange}>
                <option value="Instructor">Instructor</option>
                <option value="Candidate">Candidate</option>
              </Form.Select>
            </Form.Group>

            {/* Email + OTP */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                </Form.Group>
                <Button onClick={sendOtpToEmail} className='btn-dark mt-2'>Send OTP to Email</Button>
                <Form.Group className="mt-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    OTPLength={6}
                    otptype="number"
                    disabled={false}
                    autoFocus
                  />
                  <Button onClick={verifyOtp} className='btn-dark mt-2'>Verify OTP</Button>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Username *</Form.Label>
                  <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a username" />
                </Form.Group>
              </Col>
            </Row>

            {/* Passwords */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Password *</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Confirm Password *</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                </Form.Group>
              </Col>
            </Row>

            {/* Personal Info */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Full Name *</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Contact Number *</Form.Label>
                  <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="e.g., 9876543210" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Age *</Form.Label>
                  <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Your age" />
                </Form.Group>
              </Col>
            </Row>

            {/* Candidate only */}
            {formData.role === 'Candidate' && (
              <Form.Group className="mb-3">
                <Form.Label>Select Vehicle *</Form.Label>
                <Form.Select name="vehicleToLearn" value={formData.vehicleToLearn} onChange={handleChange}>
                  <option value="">Select a vehicle</option>
                  <option value="Car">Car</option>
                  <option value="Bike">Bike</option>
                  <option value="Scooty">Scooty</option>
                </Form.Select>
              </Form.Group>
            )}

            {/* Instructor only */}
            {isInstructor && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Experience *</Form.Label>
                  <Form.Control type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 20+ Years" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Specialties *</Form.Label>
                  <Form.Control type="text" name="specialties" value={formData.specialties} onChange={handleChange} placeholder="e.g., Beginner Car Training" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>License Number *</Form.Label>
                  <Form.Control type="text" name="license" value={formData.license} onChange={handleChange} placeholder="License number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Bio *</Form.Label>
                  <Form.Control as="textarea" name="bio" value={formData.bio} onChange={handleChange} rows={3} />
                </Form.Group>
              </>
            )}

            {/* Avatar */}
            <Row className="mb-4 align-items-center">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Upload Avatar *</Form.Label>
                  <Form.Control type="file" name="avatar" accept="image/*" onChange={handleAvatarChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                {avatarPreview && (
                  <Image src={avatarPreview} roundedCircle thumbnail style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                )}
              </Col>
            </Row>

            {/* Terms */}
            <Form.Group className="mb-4 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                name="termsAccepted"
                id="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="me-2"
              />
              <Form.Label htmlFor="termsAccepted" className="mb-0">
                I agree to the{' '}
                <span
                  onClick={() => setShowTerms(true)}
                  style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                  Terms and Conditions
                </span>
              </Form.Label>
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" variant="primary" className="w-100">
              Register
            </Button>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </Form>

          {/* Terms Modal */}
          <Modal show={showTerms} onHide={() => setShowTerms(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Terms and Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <TermsAndConditions />
            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Register;
