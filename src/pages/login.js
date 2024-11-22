import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

import '../styles/login.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Get the stored redirect URL or default to home
      const redirectUrl = sessionStorage.getItem('redirectUrl') || '/';
      sessionStorage.removeItem('redirectUrl'); // Clean up
      navigate(redirectUrl);
    }
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = login(username, password);
    if (!success) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            {/* Logo and Title */}
            <div className="text-center mb-5">  
              <svg width="165" height="70" viewBox="0 0 165 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1143_2825)">
                <path d="M45.6003 10.7377L34.8993 0L19.0396 15.9066L29.7457 26.6442L45.6053 10.7377H45.6003ZM43.0916 40.0347L58.9512 24.1282L48.0988 13.2437L32.2392 29.1502L43.0916 40.0347ZM0 35.0025L34.8993 70.0051L51.4353 53.4201L16.536 18.4125L0 35.0025Z" fill="#0044C8"/>
                <path d="M82.3622 43.5685V53.8708H77.3701V28.153H82.3622V31.3221C83.7655 29.0187 85.9915 27.6467 88.5405 27.6467C93.3156 27.6467 97.1215 31.8233 97.1215 37.4428C97.1215 43.0622 93.3156 47.2034 88.5405 47.2034C86.0268 47.2034 83.8008 45.8365 82.3622 43.5634V43.5685ZM82.3622 35.3924V39.4273C83.2254 41.1587 85.093 42.561 87.319 42.561C89.974 42.561 92.094 40.4348 92.094 37.4478C92.094 34.4609 89.974 32.2587 87.319 32.2587C85.093 32.2587 83.2607 33.7016 82.3622 35.3924Z" fill="#262626"/>
                <path d="M100.64 46.6666V19.6528H105.773V46.6666H100.64Z" fill="#262626"/>
                <path d="M124.02 43.5683C122.617 45.8718 120.391 47.2083 117.842 47.2083C113.067 47.2083 109.296 43.0317 109.296 37.3768C109.296 31.7219 113.067 27.6516 117.842 27.6516C120.391 27.6516 122.617 28.9831 124.02 31.2562V28.1579H129.012V46.6716H124.02V43.5734V43.5683ZM119.064 42.5608C121.29 42.5608 123.157 41.1585 124.02 39.498V35.3214C123.122 33.6659 121.29 32.2585 119.064 32.2585C116.444 32.2585 114.324 34.3848 114.324 37.3717C114.324 40.3586 116.444 42.5608 119.064 42.5608Z" fill="#262626"/>
                <path d="M139.86 32.2233V46.6668H134.726V32.2233H131.531V28.153H134.726V22.9639H139.86V28.153H143.09V32.2233H139.86Z" fill="#262626"/>
                <path d="M154.654 47.2085C149.051 47.2085 144.922 42.9964 144.922 37.301C144.922 31.9347 149.122 27.6467 154.584 27.6467C160.797 27.6467 164.098 32.7953 164.098 38.0908H149.41C149.768 41.0828 151.817 42.88 154.654 42.88C156.628 42.88 158.531 41.8725 159.288 40.1766H163.851C162.882 44.5 159.076 47.2034 154.659 47.2034L154.654 47.2085ZM149.697 35.2153H159.177C158.601 33.089 156.986 31.793 154.614 31.793C152.241 31.793 150.374 33.089 149.692 35.2153H149.697Z" fill="#262626"/>
                </g>
                <defs>
                <clipPath id="clip0_1143_2825">
                <rect width="164.098" height="70" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            </div>

            {/* Login Form */}
            <div className='mb-5'>
              
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-danger py-2 mb-3" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="mb-3">
                    <label 
                      htmlFor="username" 
                      className="form-label"
                    >
                      <strong>Username</strong>
                    </label>
                    <input
                      id="username"
                      type="text"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>

                  <div className="mb-4">
                    <label 
                      htmlFor="password" 
                      className="form-label"
                    >
                     <strong>Password</strong>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Sign In
                  </button>
                </form>

            </div>

            <div className="text-center mt-4 footer-login"><small>Built by Tectonica</small></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;