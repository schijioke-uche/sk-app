import React from 'react';
import useAuth from './../../state/useAuth';

const ProfileInfoComponent = () => {
  const { profile, isAuthenticated } = useAuth();

  const profileButton = (
    <button className="login_button">
      <span style={{ marginLeft: '1rem' }}>
        {isAuthenticated ? `Logout` : `Login`}
      </span>
    </button>
  );
  const handleLogin = () => {
    window.location = '/auth/login';
  };
  const handleLogout = () => {
    window.location = '/auth/logout';
  };

  return (
    <div className="avatar_dropdown">
      <div className="avatar_dropdown_container">
        {isAuthenticated && (
          <div className="profile_line">
            <svg
              focusable="false"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M16 4a5 5 0 11-5 5 5 5 0 015-5m0-2a7 7 0 107 7A7 7 0 0016 2zM26 30H24V25a5 5 0 00-5-5H13a5 5 0 00-5 5v5H6V25a7 7 0 017-7h6a7 7 0 017 7z"></path>
            </svg>
            <div className="profile_name">
              <span>{isAuthenticated ? profile.displayName : null}</span>
              <span>
                {isAuthenticated ? profile.email.toLowerCase() : null}
              </span>
            </div>
          </div>
        )}
        <div
          className="button_container"
          onClick={isAuthenticated ? handleLogout : handleLogin}
        >
          <svg
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M14 26L15.41 24.59 7.83 17 28 17 28 15 7.83 15 15.41 7.41 14 6 4 16 14 26z"></path>
          </svg>
          {profileButton}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoComponent;
