import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { STORE_USER_NAME, STORE_USER_TOKEN } from '../../features/UserSlice';
import { useState } from 'react';
const Header = () => {
  const token = useSelector((state) => state.UserInfo.token);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [login, setLogin] = useState(true);
  const logoutHandler = () => {
    dispatch(STORE_USER_NAME(''))
    dispatch(STORE_USER_TOKEN(''))
    navigator('/signup');
  }
  const signupHandler = () => {
    setLogin(!login)
  }
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Nav className="me-auto" style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', width: '100%' }} >
            <div style={{ display:'flex',gap:'12px'}}>
            <NavLink to="/" style={{
              textDecoration: 'none',
            }}
              className={({ isActive }) => isActive ? "activeNavbar" : "Navbar"}
            >Home</NavLink>
            <NavLink to="/expense" style={{
              textDecoration: 'none',
            }}
              className={({ isActive }) => isActive ? "activeNavbar" : "Navbar"}
              >Expenses</NavLink>
              </div>
            {token ?
              <NavLink to="/signup" style={{ textDecoration: 'none', }}
                className={({ isActive }) => isActive ? "activeNavbar" : "Navbar"}
                onClick={logoutHandler}
              >Logout</NavLink> :
              <>
                <NavLink to={login?'/signup':'/login'} style={{ textDecoration: 'none', }}
                  className={({ isActive }) => isActive ? "activeNavbar" : "Navbar"}
                  onClick={signupHandler}
                >{login?'SignUp':'Log In' }</NavLink>
              </>
            }
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  )
}

export default Header
