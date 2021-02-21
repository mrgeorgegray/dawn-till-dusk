import cacheManager, { Store } from "cache-manager";
import fsStore from "cache-manager-fs-hash";

export const diskCache = cacheManager.caching({
  store: fsStore as Store,
  path: ".cache",
  ttl: 60 * 60,
});

export const cacheResponse = async <T>(
  key: string,
  request: () => Promise<T>
): Promise<T> => {
  if (process.env.DISABLE_CACHE === "true") {
    return await request();
  }

  return diskCache.wrap(key, async () => {
    return await request();
  });
};
