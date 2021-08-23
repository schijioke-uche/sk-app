import './app.scss';
import React from 'react';
import { Content, Loading } from 'carbon-components-react';
import { Route, Switch } from 'react-router-dom';
import ManagerSearchPage from './components/ManagerSearchPage';

import useAuth from './state/useAuth';

import SkillsHeader from './components/SkillsHeader';
import InfoForm from './components/InfoForm';
import UserView from './components/UserView';
import LandingPageComponent from './components/LandingPageComponent';
import PersonnelForm from './components/PersonnelForm';

function App() {
  const { loading, hasRole } = useAuth();

  if (loading)
    return (
      <>
        <SkillsHeader />
        <Content>
          <Loading
            className="loading_spinner"
            withOverlay={false}
            description={`Loading Skills App`}
          />
        </Content>
      </>
    );

  if (!hasRole(['USER'])) {
    return (
      <>
        <SkillsHeader />
        <Content>
          <LandingPageComponent />
        </Content>
      </>
    );
  }

  return (
    <>
      <SkillsHeader />
      <Content>
        {/*Switch component below is from react-router-dom, not deprecated */}
        <Switch>
          <Route exact path="/" component={LandingPageComponent} />
          <Route path="/profile" component={PersonnelForm} />
          <Route path="/info" component={InfoForm} />
          <Route path="/search" component={ManagerSearchPage} />
          <Route path="/userSkills" component={UserView} />
        </Switch>
      </Content>
    </>
  );
}

export default App;
