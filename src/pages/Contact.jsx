import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { EnvelopeFill, GeoAltFill, TelephoneFill } from 'react-bootstrap-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Contact() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    msg: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const res = await axios.post(`${BACKEND_BASE_URL}/user/sendMsg`, formData);
      setLoading(false);
      toast.success("Message sent successfully!", {
        autoClose: 2000
      });
      setFormData({ name: "", email: "", subject: "", msg: "" }); 
      
      navigate("/")
        
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        autoClose: 2000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <Container className="py-5">
    <h2 className="text-center mb-4 fw-bold">Contact Us</h2>
      <p className="text-center text-muted mb-5">
        Have a question, feedback, or need help? We'd love to hear from you.
      </p>

    {loading ? (<Loader />) : 
    (
      <>
      

      <Row className="gy-4">
        <Col lg={6}>
          <div className="p-4 shadow rounded bg-light">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email" 
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject" 
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="msg" 
                  rows={4}
                  placeholder="Your message"
                  value={formData.msg}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-end">
                <Button variant="dark" type="submit">
                  Send Message
                </Button>
              </div>
            </Form>
          </div>
        </Col>

        <Col lg={6}>
          <div className="mb-4">
            <h5 className="fw-semibold mb-3">Get in Touch</h5>
            <p><GeoAltFill className="me-2 text-danger" /> Moti Niwa House no. 202 A.B. Road Guljhara Dhamnod <br/>Tehsil: Dharampuri <br/>Dist: Dhar <br/>M.P. 454552</p>
            <p><EnvelopeFill className="me-2 text-primary" /> maxpro.mp55@gmail.com</p>
            <p><TelephoneFill className="me-2 text-success" /> +91 9806807575</p>
          </div>

          <div className="rounded overflow-hidden shadow">
            <iframe
              title="Driving School Location"
              src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d8262.328730646643!2d75.47367719728224!3d22.222971382205305!3m2!1i1024!2i768!4f13.1!2m1!1sMoti%20Niwas%20House%20no%20202%20AB%20Road%20Guljhara%20Dhamnod%20Tehsil%20Dharampuri%20Dist%20Dhar%20MP%20454552!5e0!3m2!1sen!2sin!4v1751903688471!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </Col>
      </Row>
      </>
    )}
    </Container>
  );
}

export default Contact;
