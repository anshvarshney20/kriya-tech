import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './AuthContext';
import '../Assets/Styles/Form.css';
import Cookies from 'universal-cookie';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await logIn(email, password);
      cookies.set('auth', 'loggedIn', { path: '/' });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br/>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg btn-block" style={{width:'280px'}}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
