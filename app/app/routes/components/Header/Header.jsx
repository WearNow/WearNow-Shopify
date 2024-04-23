import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '..//../Assets/img/logo.png';
import plus_icon from '..//../Assets/img/plus-icon.png';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dashboard from '../Dashboard'; 
import Products from '../Products';
import History from '../History';
import Setting from '../Setting';
import VartualTryOn from '../VartualTryOn';
import PhototStudio from '../PhototStudio';

function Header() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [tryOnActive, setTryOnActive] = useState(false);

  const handleTryOnToggle = () => {
    setTryOnActive(!tryOnActive);
  };

  const handleNavItemClick = (componentName) => {     
    setActiveComponent(componentName);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'history':
        return <History />;
        case 'settings':
          return <Setting />;
        case 'VartualTryOn':
            return <VartualTryOn/>;
        case 'PhototStudio':
              return <PhototStudio/>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} style={{ width: '60px', height: '60px' }} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto gap-5">
            <Nav.Link onClick={() => handleNavItemClick('dashboard')} className={activeComponent === 'dashboard' ? 'active' : ''} style={{ padding: '20px 0px' }} >Dashboard</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('products')} className={activeComponent === 'products' ? 'active' : ''} style={{ padding: '20px 0px' }}>Products</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('history')} className={activeComponent === 'history' ? 'active' : ''} style={{ padding: '20px 0px' }}>History</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('VartualTryOn')} className={activeComponent === 'VartualTryOn' ? 'active' : ''} style={{ padding: '20px 0px' }}>Virtual Try-On</Nav.Link>
            <Nav.Link onClick={() => handleNavItemClick('PhototStudio')} className={activeComponent === 'PhototStudio' ? 'active' : ''} style={{ padding: '20px 0px' }}>Photo Studio</Nav.Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Button variant="outline-primary" style={{ borderRadius: '20px' }}>
              Create New{' '}
              <Badge bg="light" text="primary">
                <img src={plus_icon} style={{ width: '17px', height: '17px' }} alt="Plus Icon" />
              </Badge>
            </Button>
            <div className="d-flex align-items-center" style={{ marginLeft: '30px' }}>
              <p style={{ margin: '0px', color: tryOnActive ? 'green' : 'black' }}>Try-On Active</p>
             <input type="checkbox" id="switch"checked={tryOnActive}
                onChange={handleTryOnToggle}style={{ marginLeft: '10px' }}/><label for="switch">Toggle</label>
            </div>
            <Nav className="me-auto" style={{ marginLeft: '20px' }}>
              <Nav.Link onClick={() => handleNavItemClick('settings')} className={activeComponent === 'settings' ? 'active' : ''} style={{ padding: '20px 0px' }}>Settings</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <Container>
        {renderComponent()}
      </Container>
      <style>
        {`
          .nav-link.active {
            border-bottom: 2px solid #16AFF0;
            color: #16AFEF !important;
          }
          input[type=checkbox]{
            height: 0;
            width: 0;
            visibility: hidden;
          }
          label {
            cursor: pointer;
            text-indent: -9999px;
            width: 33px;
            height: 21px;
            background: grey;
            display: block;
            border-radius: 100px;
            position: relative;
        }
        label:after {
          content: '';
          position: absolute;
          top: 2.1px;
          left: 2px;
          width: 16px;
          height: 17px;
          background: #fff;
          border-radius: 90px;
          transition: 0.3s;
      }
          
          input:checked + label {
            background: green;
          }
          
          input:checked + label:after {
            left: calc(100% - 2px);
            transform: translateX(-100%);
          }
          
          label:active:after {
            width: 15px;
          }
        `}
      </style>
    </>
  );
}

export default Header;
