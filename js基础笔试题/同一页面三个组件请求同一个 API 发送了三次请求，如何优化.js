const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Fetch: ", id);
      resolve(id);
    }, 5000);
  });
};

const cache = {};
const cacheFetchUser = (id) => {
  if (cache[id]) {
    return cache[id];
  }
  cache[id] = fetchUser(id);
  return cache[id];
};

cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))
cacheFetchUser(3).then((id) => console.log(id))