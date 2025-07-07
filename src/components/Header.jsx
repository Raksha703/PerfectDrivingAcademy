import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logo, bg } from '../assets/assets';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const role = user ? user.data.role : "Candidate";

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/user/logout`, {}, { withCredentials: true });

      if (response.status === 200) {
        setExpanded(false);
        toast.success("Logged out successfully.", {
          autoClose: 2000
        });
        window.location.reload()
      } else {
        console.error('Logout failed');
        toast.error("Failed to logout.", {
          autoClose: 2000
        });
        
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error("Failed to logout.", {
        autoClose: 2000
      });
    }
  };

  const handleNavClick = (path) => {
    setExpanded(false);
    navigate(path);
  };

  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
      fixed="top"
      expand="lg"
      className="shadow-sm py-2"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "#ffffff",
      }}
    >
      <Container fluid className="px-3">
        <Navbar.Brand onClick={() => handleNavClick('/')} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
          <img
            src={logo}
            alt="Perfect Driving Academy Logo"
            className="me-3"
            style={{ width: '100px', height: '80px', objectFit: 'contain' }}
          />
{/* For large screens */}
<span
  className="fw-semibold text-nowrap d-none d-lg-inline"
  style={{ maxWidth: '220px', fontSize: '1.75rem' }}
>
  Perfect Car Driving Training Academy
</span>

{/* For small screens */}
<span
  className="fw-semibold d-inline d-lg-none"
  style={{
    maxWidth: '180px',
    fontSize: '1rem',
    whiteSpace: 'normal',
    lineHeight: '1.2',
  }}
>
  Perfect Car Driving <br />Training Academy
</span>

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="me-2" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link onClick={() => handleNavClick('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/services')}>Services</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/course')}>Courses</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/video')}>Gallery</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/instructor')}>Instructor</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/contact')}>Contact Us</Nav.Link>

            {user ? (
              <NavDropdown title="Profile" id="profile-dropdown" align="end">
                {role === 'Instructor' ? (
                  <>
                    <NavDropdown.Item onClick={() => handleNavClick('/videoSettings')}>Gallery Settings</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleNavClick('/user')}>Candidates</NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item onClick={() => handleNavClick(`/logsheet/${user.data._id}`)}>Logsheet</NavDropdown.Item>
                )}

                <NavDropdown.Item onClick={() => handleNavClick('/profile')}>My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Profile" id="profile-dropdown" align="end">
                <NavDropdown.Item onClick={() => handleNavClick('/register')}>Register</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleNavClick('/login')}>Login</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
