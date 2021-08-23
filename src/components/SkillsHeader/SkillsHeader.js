import React, { useState } from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  SkipToContent,
  SideNav,
  SideNavItems,
  HeaderSideNavItems,
} from 'carbon-components-react';
import useAuth from './../../state/useAuth';
import { UserAvatar20 } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import ProfileInfoComponent from '../ProfileInfoComponent';

const SkillsHeader = () => {
  const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <Header aria-label="Skills App">
          <SkipToContent />
          <HeaderMenuButton
            aria-label="Open menu"
            onClick={onClickSideNavExpand}
            isActive={isSideNavExpanded}
          />
          <HeaderName element={Link} to="/" prefix="IBM">
            Skills App
          </HeaderName>
          {isAuthenticated && (
            <HeaderNavigation aria-label="Skills App">
              <HeaderMenuItem element={Link} to="/profile">
                Profile
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/info">
                Submit Skill Data
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/userSkills">
                Snapshot of Your Skills
              </HeaderMenuItem>
              <HeaderMenuItem element={Link} to="/search">
                Manager Skill Search
              </HeaderMenuItem>
            </HeaderNavigation>
          )}
          <SideNav
            aria-label="Side navigation"
            expanded={isSideNavExpanded}
            isPersistent={false}
          >
            <SideNavItems>
              <HeaderSideNavItems>
                <HeaderMenuItem element={Link} to="/profile">
                  Profile
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/info">
                  Enter Data as User
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/userSkills">
                  Snapshot of Your Skills
                </HeaderMenuItem>
                <HeaderMenuItem element={Link} to="/search">
                  Manager Search Page
                </HeaderMenuItem>
              </HeaderSideNavItems>
            </SideNavItems>
          </SideNav>
          <HeaderGlobalBar>
            <HeaderGlobalAction
              aria-label="User Avatar"
              className="user_avatar"
              onClick={() => setShowAvatarDropdown(!showAvatarDropdown)}
            >
              <UserAvatar20 />
            </HeaderGlobalAction>
            {showAvatarDropdown && <ProfileInfoComponent />}
          </HeaderGlobalBar>
        </Header>
      )}
    />
  );
};

export default SkillsHeader;
