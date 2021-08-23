import { Button, Tabs, Tab } from 'carbon-components-react';
import LandingPageTabs from '../LandingPageTabs';
import useAuth from './../../state/useAuth';

const props = {
  tabs: {
    selected: 0,
    role: 'navigation',
  },
  tab: {
    role: 'presentation',
    tabIndex: 0,
  },
};

const LandingPageComponent = () => {
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
    <div className="bx--grid bx--grid--full-width landing-page">
      <div className="bx--row landing-page__banner">
        <div className="bx--col-lg-16">
          <h1 className="landing-page__heading">
            {!isAuthenticated
              ? `Skills App`
              : `Welcome, ${profile.displayName}`}
          </h1>
        </div>
      </div>
      <div className="bx--row landing-page__r2">
        <div className="bx--col bx--no-gutter">
          <Tabs {...props.tabs} aria-label="Tab navigation">
            <Tab {...props.tab} label="Log In">
              <LandingPageTabs
                props={props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
              />
            </Tab>
            <Tab {...props.tab} label="How to Use">
              <div className="bx--grid bx--grid--no-gutter bx--grid--full-width">
                <div className="bx--row landing-page__tab-content">
                  <div className="bx--col-md-4 bx--col-lg-7">
                    <h1 className="landing-page__subheading">
                      How To Get Started As a Garage Team Member
                    </h1>
                    <p className="landing-page__p">
                      To begin using this application, start by logging in.
                      After you have successfully logged in using your W3
                      credentials you can fill out the necessary information
                      under the tab labeled "Enter Data as User." This will
                      enable Garage Leaders to see what skills you can
                      contribute to engagements.
                      <p className="landing-page__p"></p>
                      <h1 className="landing-page__subheading">
                        How To Get Started As a Garage Leader
                      </h1>
                      <p className="landing-page__p">
                        To begin using this application, log in using your W3
                        credentials. Once you have successfully logged in, hover
                        to the "Manager Search Page" tab to begin searching for
                        the right talent. There are several ways to navigate
                        this application but you can begin by...
                      </p>
                    </p>
                  </div>
                  <div className="bx--col-md-4 bx--offset-lg-1 bx--col-lg-8">
                    <img
                      className="landing-page__illo"
                      src={`${process.env.PUBLIC_URL}/people_image.png`}
                      alt="IBM Logo"
                    />
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <div className="bx--row landing-page__r3">
        <div className="bx--col-md-4 bx--col-lg-4">
          <h3 className="landing-page__label">IBM Garage Skills&trade;</h3>
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">
          IBM Garage + Customer Experience
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">
          IBM Garage + Enterprise Design Thinking
        </div>
        <div className="bx--col-md-4 bx--col-lg-4">
          IBM Garage + Hybrid Cloud
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponent;
