import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import { useAuth } from '../context/AuthContext';

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
            <div className="text-center mb-4">
              <svg 
                className="mb-3" 
                width="48" 
                height="48" 
                viewBox="0 0 20 20" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M10 12.9786L7.97967 14.999L10 17.0191L12.0202 14.999L10 12.9786ZM6.9695 13.9888C6.41162 14.5467 6.41162 15.4512 6.9695 16.009L8.98983 18.0293C9.54772 18.5873 10.4522 18.5873 11.0102 18.0293L13.0303 16.009C13.5883 15.4511 13.5883 14.5466 13.0303 13.9888L10.404 11.3625C10.1809 11.1393 9.81903 11.1393 9.59593 11.3625L6.9695 13.9888Z" fill="#262626"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.9783 10.0002L14.9987 12.0206L17.019 10.0002L14.9987 7.97992L12.9783 10.0002ZM11.362 9.59622C11.1389 9.8194 11.1389 10.1812 11.362 10.4043L13.9884 13.0307C14.5463 13.5886 15.4507 13.5886 16.0087 13.0307L18.029 11.0103C18.5869 10.4525 18.5869 9.54792 18.029 8.99002L16.0087 6.96968C15.4508 6.4118 14.5463 6.4118 13.9884 6.96968L11.362 9.59622Z" fill="#262626"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10 2.98084L7.97967 5.00118L10 7.02151L12.0202 5.00118L10 2.98084ZM6.9695 3.99099C6.41162 4.54888 6.41162 5.45343 6.9695 6.01133L9.59583 8.63766C9.81902 8.86084 10.1808 8.86084 10.404 8.63766L13.0303 6.01133C13.5882 5.45344 13.5882 4.54889 13.0303 3.99099L11.0101 1.97066C10.4522 1.41278 9.5477 1.41278 8.9898 1.97066L6.9695 3.99099Z" fill="#262626"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5.00116 7.97988L2.981 10L5.00116 12.0204L7.0215 10L5.00116 7.97988ZM1.97083 8.99003C1.41288 9.54792 1.41288 10.4524 1.97083 11.0102L3.991 13.0305C4.54888 13.5884 5.45343 13.5884 6.01133 13.0305L8.63766 10.4042C8.86085 10.181 8.86085 9.81917 8.63766 9.59607L6.01133 6.96973C5.45345 6.41178 4.54896 6.41178 3.991 6.96973L1.97083 8.99003Z" fill="#262626"/>
              </svg>
              <h1 className="h4 fw-semibold text-dark">
                Tectonica Library of Components
              </h1>
            </div>

            {/* Login Form */}
            <div className="card border">
              <div className="card-body">
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
                      Username
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
                      Password
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
                    className="btn btn-dark w-100"
                  >
                    Sign In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;