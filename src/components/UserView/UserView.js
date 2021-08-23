import React, { useEffect, useState } from 'react';
import { Tab, Tabs, DataTableSkeleton } from 'carbon-components-react';
import SkillsTable from '../SkillsTable';
import axios from 'axios';

import useAuth from './../../state/useAuth';
import {
  queryGeneralPreference,
  makeStateFromGeneralQuery,
  createCategoriesForTabs,
  headers,
} from './utilities';

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

const UserView = () => {
  const { profile } = useAuth();
  const [generalRows, setGeneralRows] = useState([]);
  const [tabRows, setTabRows] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { email } = profile;
      const user = await axios.get(`/employees/${email}`);
      const employee_id = user.data[0]['employee_id'];
      const result = await queryGeneralPreference(employee_id);
      const generalState = makeStateFromGeneralQuery(result);
      const createCategories = createCategoriesForTabs(result);
      setGeneralRows((prevState) => {
        return [...prevState, ...generalState];
      });
      setTabRows(() => {
        return [...createCategories];
      });
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div>
      <Tabs {...props.tabs} aria-label="Tab navigation">
        <Tab {...props.tab} label="General Skills">
          <SkillsTable
            title={profile.displayName}
            description="General Skills"
            rows={generalRows}
            headers={headers}
            loading={loading}
          />
        </Tab>
        {tabRows &&
          tabRows.map((item, index) => (
            <Tab {...props.tab} key={index} label={item[0]}>
              <SkillsTable
                title={profile.displayName}
                description={item[0]}
                rows={item[1]}
                headers={headers}
              />
            </Tab>
          ))}
      </Tabs>
    </div>
  );
};

export default UserView;
