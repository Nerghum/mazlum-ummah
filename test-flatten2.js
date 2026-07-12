function flattenObj(obj, prefix = '', res = {}) {
  for (let [key, val] of Object.entries(obj)) {
    if (val && typeof val === 'object' && !Array.isArray(val) && val !== null && !(val instanceof Date)) {
      flattenObj(val, prefix + key + '.', res);
    } else {
      res[prefix + key] = val;
    }
  }
  return res;
}
console.log(flattenObj({ site: { title: 'a', logo: 'b' }, news: 'c' }));
