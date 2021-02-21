const cacheManager = require("cache-manager");
const fsStore = require("cache-manager-fs-hash");

const diskCache = cacheManager.caching({
  store: fsStore,
  options: {
    path: ".cache",
    ttl: 60 * 60,
  },
});

const cacheResponse = async (key, request) => {
  if (process.env.DISABLE_CACHE === "true") {
    return await request();
  }

  return diskCache.wrap(key, async () => {
    return await request();
  });
};

module.exports = {
  cacheResponse,
  diskCache,
};
