import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, NavLink } from "react-router-dom";
import './Header.css'
const Header = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto" style={{ display: 'flex', gap: '12px' }} >
            <NavLink to="/" style={{
              textDecoration: 'none',

            }}
              className='NavLinkClass'
            >Home</NavLink>
            <NavLink to="/signup" style={{ textDecoration: 'none', color: 'white' }} className='NavLinkClass'>SignUp</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default Header
