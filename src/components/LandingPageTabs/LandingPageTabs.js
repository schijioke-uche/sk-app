import React from 'react';
import { Button, Tabs, Tab } from 'carbon-components-react';
import useAuth from './../../state/useAuth';

const LandingPageTabs = ({ props }) => {
  const { profile, isAuthenticated } = useAuth();
  const handleLogin = () => {
    window.location = '/auth/login';
  };
  const handleLogout = () => {
    window.location = '/auth/logout';
  };
  const loginButton = <Button onClick={handleLogin}>Login</Button>;
  const logoutButton = <Button onClick={handleLogout}>Logout</Button>;

  return (
    <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
      <div className="bx--row landing-page__tab-content">
        <div className="bx--col-md-4 bx--col-lg-7">
          <h1 className="landing-page__subheading">IBM Garage Skills</h1>
          <p className="landing-page__p">
            We start with your business outcome — not a specific technology — to
            help you build the right solutions to deliver results. To achieve
            your goals, you need the right talent and that is where the Garage
            Skills App comes in. The Garage Skills Application was built to help
            our members identify the people with the skills you are looking for
            in order to have a successful engagement.
          </p>
          {!isAuthenticated ? loginButton : logoutButton}
        </div>
        <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
          <img
            className="landing-page__illo"
            src={`${process.env.PUBLIC_URL}/tab-illo.png`}
            alt="IBM Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageTabs;
