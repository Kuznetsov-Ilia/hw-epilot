const CACHE_DB_NAME = "fetchCache";
const CACHE_STORE_NAME = "responses";
const isBrowser = typeof process === "undefined";
export async function fetchWithCache<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  let cacheKey = url;
  if (options) cacheKey += JSON.stringify(options);
  let response;

  if (isBrowser) {
    // Check IndexedDB cache
    try {
      const db = await openDB();
      const cacheData = await getDataFromCache(db, cacheKey);
      console.log(cacheData);
      if (cacheData) {
        response = cacheData;
      }
    } catch (error) {
      console.error("Failed to fetch data from IndexedDB cache:", error);
    }
    // Check localStorage cache
    if (!response) {
      const cacheData = localStorage.getItem(cacheKey);
      if (cacheData) {
        try {
          response = JSON.parse(cacheData);
        } catch (error) {
          console.error("Failed to parse data from localStorage cache:", error);
        }
      }
    }
  }

  // Fetch from the network if cache not found
  if (!response) {
    try {
      let ok = false;
      response = await fetch(url, options).then((res) => {
        ok = res.ok;
        return res.json();
      });
      if (!ok) throw Object.assign(new Error(), response);
      if (isBrowser && response) {
        try {
          // Store the response in IndexedDB cache
          const db = await openDB();
          await saveDataToCache(db, cacheKey, response);
        } catch (error) {
          console.error("Failed to save data to IndexedDB cache:", error);
          try {
            // Store the response in localStorage cache
            localStorage.setItem(cacheKey, JSON.stringify(response));
          } catch (error) {
            console.error("Failed to save data to localStorage cache:", error);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch data from the network:", error);
      throw error;
    }
  }
  if (!response) {
    throw new Error("Failed to fetch data.");
  }
  return response;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(CACHE_DB_NAME, 1);
    request.onerror = () =>
      reject(new Error("Failed to open the cache database."));
    request.onsuccess = (event) =>
      resolve((event.target as IDBOpenDBRequest).result as IDBDatabase);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      db.createObjectStore(CACHE_STORE_NAME, { keyPath: "url" });
    };
  });
};

const getDataFromCache = (
  db: IDBDatabase,
  key: string
): Promise<Record<string, unknown> | null> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CACHE_STORE_NAME, "readonly");
    const store = transaction.objectStore(CACHE_STORE_NAME);
    const request = store.get(key);
    request.onsuccess = (event) => {
      const result = (event.target as IDBRequest<IDBValidKey>)
        .result as unknown as DBValue;
      if (result && result.data) {
        resolve(result.data);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(new Error("Failed to retrieve data from cache."));
    };
  });
};

const saveDataToCache = (
  db: IDBDatabase,
  key: string,
  data: Record<string, unknown>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CACHE_STORE_NAME, "readwrite");
    const store = transaction.objectStore(CACHE_STORE_NAME);
    const value: DBValue = { url: key, data };
    const request = store.put(value);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error("Failed to save data to cache."));
  });
};

type DBValue = {
  url: string;
  data: Record<string, unknown>;
};
