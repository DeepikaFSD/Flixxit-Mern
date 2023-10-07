import React from 'react';
import styled from 'styled-components';
import logo from '../assets/FLIXXIT-LOGO.png';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  padding: 0 4rem;
  .logo {
    flex: 1;
    img {
      height: 5rem;
    }
  }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem;
  }
  .btn {
    margin-top: 20px;
  }
`;

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="logo">
        <img src={logo} alt={logo} />
      </div>
      <div className="btn">
        <button onClick={() => navigate(props.login ? '/login' : '/signup')}>
          {props.login ? 'Log In' : 'Sign In'}
        </button>
      </div>
    </Container>
  );
};

export default Header;
