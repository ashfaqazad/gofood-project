import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../Pages/Cart';
import { useCart } from './ContextReducer';
import LoginModal from '../Components/LoginModal';  // Import LoginModal
import SignupModal from '../Components/SignupModal';  // Import SignUpModal
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

export default function Navbar() {
  let data = useCart();

  const [cartView, setCartView] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  const authToken = Cookies.get('token');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const renderDrawerList = () => (
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      {authToken && (
        <ListItem button component={Link} to="/MyOrders">
          <ListItemText primary="My Orders" />
        </ListItem>
      )}
      {authToken ? (
        <>
          <ListItem button onClick={() => setCartView(true)}>
            <ListItemText primary="My Cart" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={() => setIsLoginOpen(true)}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => setIsSignupOpen(true)}>
            <ListItemText primary="Signup" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand fs-1 fw-bold fst-italic">FastFood</Link>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="ms-auto d-lg-none"
          >
            <MenuIcon />
          </IconButton>

          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarSupportedContent">
            <div className="d-flex align-items-center mt-1 w-100">
              <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5" aria-current="page" to="/"
                    style={{ textDecoration: 'none', fontSize: '1.2rem' }}
                  >
                    Home
                  </Link>
                </li>
                {authToken && (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5" aria-current="page" to="/MyOrders"
                      style={{ textDecoration: 'none', fontSize: '1.2rem' }}
                    >
                      My Orders
                    </Link>
                  </li>
                )}
              </ul>

              <div className='d-flex ms-auto'>
                {authToken ? (
                  <>
                    <button 
                      className="btn bg-white text-success mx-1" 
                      onClick={() => setCartView(true)} 
                      style={{ textDecoration: 'none' }}
                    >
                      My Cart {"  "}
                      <Badge pill bg='danger'>{data.length}</Badge>
                    </button>
                    {cartView && (
                      <Modal onClose={() => setCartView(false)}>
                        <Cart />
                      </Modal>
                    )}
                    <button onClick={handleLogout} className="btn bg-white text-danger mx-1" style={{ textDecoration: 'none' }}>Logout</button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsLoginOpen(true)} 
                      className="btn bg-white text-success mx-1" 
                      style={{ textDecoration: 'none' }}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => setIsSignupOpen(true)} 
                      className="btn bg-white text-success mx-1" 
                      style={{ textDecoration: 'none' }}
                    >
                      Signup
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawerList()}
      </Drawer>

      {/* Modals */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </div>
  );
}
