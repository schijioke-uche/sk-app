import data from './data.json';
import langData from './languages.json';
const roles = data.roles;
const industries = data.industry;
const languages = langData.languages;
const createStateFromDb = (response) => {
  if (!response) return;
  const {
    employee_id,
    first_name,
    last_name,
    manager,
    location,
    role,
    email,
    industry,
    language,
    secondary_language,
  } = response;
  const roleIndex = roles.indexOf(role);
  const industryIndex = industries.indexOf(industry);
  let languageIndex = -1;
  if (language) {
    languages.forEach((item, index) => {
      if (item.name.toLowerCase() === language.toLowerCase()) {
        languageIndex = index;
      }
    });
  }

  const state = {
    employee_id: employee_id || '',
    name: `${first_name} ${last_name}`,
    email,
    role: role || '',
    roleIndex: roleIndex > -1 ? roleIndex : '',
    location: location || '',
    manager: manager || '',
    language: language || '',
    languageIndex: languageIndex > -1 ? languageIndex : '',
    industry: industry || '',
    industryIndex: industryIndex > -1 ? industryIndex : '',
    secondary_language: secondary_language || '',
  };
  return state;
};

const createManagersFromDb = (response) => {
  console.log(`RESPONSE: ${response}`);
  if (!response || !Array.isArray(response)) return [];
  const result = [];
  response.forEach((item) => {
    const name = `${item.first_name} ${item.last_name}`;
    result.push(name);
  });
  return result;
};

export { createStateFromDb, createManagersFromDb };
