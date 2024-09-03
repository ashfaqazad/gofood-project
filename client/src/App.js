import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';  // Custom CSS should be imported after Bootstrap
import './Style/ListStyle.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import MyOrders from './Pages/MyOrders';
import { CartProvider } from './Components/ContextReducer';
import LoginModal from './Components/LoginModal';  // Import your modal
import SignupModal from './Components/SignupModal';  // Import your modal

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/MyOrders' element={<MyOrders />} />
          </Routes>
          <Footer />
          {/* <button onClick={() => setIsLoginOpen(true)}>Open Login Modal</button>
          <button onClick={() => setIsSignupOpen(true)}>Open Signup Modal</button> */}

          {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
          {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
