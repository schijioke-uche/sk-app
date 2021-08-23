import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'carbon-components-react';
import SkillsTable from '../SkillsTable';
import axios from 'axios';

import {
  queryGeneralPreference,
  makeStateFromGeneralQuery,
  createCategoriesForTabs,
  headers,
} from '../UserView/utilities';

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

const ManagerView = ({ employeeId }) => {
  const [generalRows, setGeneralRows] = useState([]);
  const [tabRows, setTabRows] = useState(null);
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const user = await axios.get(`/employees/id/${employeeId}`);
      const { first_name, last_name, location, manager, email } = user.data[0];
      const full_name = `${first_name} ${last_name}`;
      setFullName(full_name);
      setUserEmail(email);
      const result = await queryGeneralPreference(employeeId);
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
            title={fullName}
            description={userEmail}
            rows={generalRows}
            headers={headers}
            loading={loading}
          />
        </Tab>
        {tabRows &&
          tabRows.map((item, index) => (
            <Tab {...props.tab} key={index} label={item[0]}>
              <SkillsTable
                title={fullName}
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

export default ManagerView;
