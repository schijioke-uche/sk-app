const isEqual = require('lodash.isequal');
const reduce = require('lodash.reduce');
const convertSkillsDataToState = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0)
    return { categoryList: [], skillState: {} };
  let categoryList = [];
  let skillState = {};
  const categoryHash = {};
  data.forEach((item) => {
    const { category } = item;
    if (!categoryHash[category]) categoryHash[category] = [];
  });
  data.forEach((item, index) => {
    const { category, skill_id, skill_rating, want_to_learn } = item;
    if (categoryHash[category]) {
      item['id'] = `${index}_${item.name}`;
      categoryHash[category].push(item);
    }
    skillState[skill_id] = {
      rating: skill_rating,
      want_to_learn: want_to_learn,
    };
  });
  for (let key in categoryHash) {
    const result = { name: key, list: categoryHash[key] };
    categoryList.push(result);
  }

  const result = { categoryList, skillState };
  return result;
};

const skillRatingChanges = (a, b) => {
  const delta = reduce(
    a,
    function (result, value, key) {
      return isEqual(value, b[key]) ? result : result.concat(key);
    },
    []
  );
  return delta;
};

export { convertSkillsDataToState, skillRatingChanges };
