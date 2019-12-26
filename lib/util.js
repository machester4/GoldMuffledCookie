// Utils

function isEmpty(item) {
  if (typeof item === "object") {
    return Object.entries(item).length === 0;
  }
  return item.length;
}

function getKey(obj, first) {
  const keys = Object.keys(obj);
  return first ? keys[0] : keys;
}

function arrayUnique(array) {
  let a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
}

module.exports = {
  methods: {
    QUERY: "GET",
    CREATE: "POST",
    UPDATE: "PUT",
    DELETE: "DELETE"
  },
  isEmpty,
  getKey,
  arrayUnique
};
