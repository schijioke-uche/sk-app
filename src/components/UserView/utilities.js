import axios from 'axios';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
const queryGeneralPreference = async (employee_id) => {
  const result = await axios.get(`/preferences/${employee_id}`);
  return result.data;
};
const makeStateFromGeneralQuery = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) return [];
  const result = data.map((item, index) => {
    if (item['want_to_learn']) {
      item['want_to_learn'] = 'Yes';
    } else {
      item['want_to_learn'] = 'No';
    }
    item['altered_at'] = calculateDifferenceInDays(item['altered_at']);
    return { ...item, id: index.toString() };
  });
  return result;
};

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'skill_rating',
    header: 'Skill Rating',
  },
  {
    key: 'altered_at',
    header: 'Last Edited',
  },
  {
    key: 'want_to_learn',
    header: 'Want to Learn',
  },
];
const createCategoriesForTabs = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) return [];
  let categoryHash = {};
  let result = [];
  data.forEach((item) => {
    const { category } = item;
    if (!categoryHash[category]) categoryHash[category] = [];
  });
  data.forEach((item, index) => {
    let { category } = item;
    if (categoryHash[category]) {
      item['id'] = index.toString();
      categoryHash[category].push(item);
    }
  });
  for (let key in categoryHash) {
    const item = [key, categoryHash[key]];
    result.push(item);
  }
  return result.sort();
};

const calculateDifferenceInDays = (date) => {
  if (!date) return;
  const diffInDays = differenceInCalendarDays(new Date(), new Date(date));
  let lastEdited;
  if (diffInDays < 1) {
    lastEdited = `Edited today`;
  } else {
    lastEdited = `Edited ${diffInDays} day(s) ago`;
  }
  return lastEdited;
};
export {
  queryGeneralPreference,
  makeStateFromGeneralQuery,
  createCategoriesForTabs,
  headers,
};
