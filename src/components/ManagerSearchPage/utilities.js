import FuzzySearch from 'fuzzy-search';

const filterDataWithSearchTerm = (data, term) => {
  if (!data || data.length === 0 || !term || term.length === 0) return;
  const searcher = new FuzzySearch(data, ['name'], {
    caseSensitive: false,
  });
  let searchedData = searcher.search(term);
  const result = searchedData.map((item, index) => {
    return { ...item, id: index.toString() };
  });
  return result;
};

const orderByCategoryAndRating = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) return [];
  const result = [];
  data.forEach((item, index) => {
    const { name, skill_rating } = item;
    const idName = `${name.substr(0, 5)}${name.substr(name.length - 5)}`;
    const insert = {
      name,
      skill_rating,
      users: [],
      id: `${idName}_${skill_rating}_${index}`,
    };
    if (!exists(result, insert, 'name', 'skill_rating')) {
      result.push(insert);
    }
  });
  data.forEach((user, index) => {
    insertUser(result, user);
  });
  result.forEach((item) => {
    if (item.skill_rating === 0) item.skill_rating = '0 [Wants to learn]';
  });
  return result;
};


const exists = (arr, obj, ...keys) => {
  return arr.some((e) => keys.every((k) => e[k] && obj[k] && e[k] === obj[k]));
};

const insertUser = (data, user) => {
  if (!data || data.length === 0) return;
  data.forEach((item, index) => {
    const {
      name,
      skill_rating,
      first_name,
      last_name,
      employee_id,
      want_to_learn,
    } = user;
    const full_name = `${first_name} ${last_name}`;
    const insertUser = { name: full_name, id: employee_id, want_to_learn };
    if (name === item.name && skill_rating === item.skill_rating) {
      item.users.push(insertUser);
    }
  });
};

const initialHeadersData = [
  {
    key: 'name',
    header: 'Skill',
  },
  {
    key: 'users',
    header: 'Users',
  },
  {
    key: 'skill_rating',
    header: 'Rating',
  },
];

export {
  filterDataWithSearchTerm,
  orderByCategoryAndRating,
  initialHeadersData,
};
