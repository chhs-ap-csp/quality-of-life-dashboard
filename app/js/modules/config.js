import _ from 'lodash';
import colors from '../modules/breaks';
import mapConfig from '../../../data/config/map';
import siteConfig from '../../../data/config/site';
import dataConfigUnsorted from '../../../data/config/data';
import privateConfig from '../../../data/config/private';
import selectGroups from '../../../data/config/selectgroups';

// Sort dataConfig alphabetically by metric and category
let dataConfigTemp = [];
for (const key in dataConfigUnsorted) {
  if (dataConfigUnsorted.hasOwnProperty(key)) {
    const t = dataConfigUnsorted[key];
    t._key = key;
    dataConfigTemp.push(t);
  }
}

dataConfigTemp = dataConfigTemp.sort((a, b) => {
  if (a.category > b.category) return 1;
  if (a.category < b.category) return -1;
  if (a.title > b.title) return 1;
  if (a.title < b.title) return -1;
  return 0;
});
const dataConfig = dataConfigTemp.reduce((obj, curVal) => { obj[curVal._key] = curVal; return obj; }, {});
const categories = dataConfigTemp.reduce((categoriesArray, curVal) => { if (categoriesArray.indexOf(curVal.category) === -1) categoriesArray.push(curVal.category); return categoriesArray; }, []);

const metricsByCategory = _.fromPairs(
  categories.map(
      category => [category, Object.values(dataConfig).filter(metric => metric.category === category)]
  )
);

export default {
  categories, // List of category names only
  colors: colors.breaksGnBu5,
  dataConfig, // Object where keys are metric IDs and values are config for that metric.
  mapConfig,
  metricsByCategory, // Object where keys are category names and properties are metrics within that category.
  privateConfig,
  siteConfig,
  selectGroups,
};
