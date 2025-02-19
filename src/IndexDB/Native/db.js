const DB_NAME = "siteSentryDB";
const DB_VERSION = 1;

const OBJECT_STORE = "footage";
const OBJECT_STORE_OPERATION = "readwrite";
const OBJECT_STORE_ID = "cameraID";
const OBJECT_STORE_AUTO_INCREMENT = false;
// const OBJECT_STORE_KEYPATH = OBJECT_STORE_ID;
const OBJECT_STORE_INDEX_NAME = "by_cameraID";
const OBJECT_STORE_INDEX_OPTIONS = { unique: true };


const onUpgradeNeeded = (event, db) => {
    db = event.target.result;
    
    if (!db.objectStoreNames.contains(OBJECT_STORE)) {
        const footageStore = db.createObjectStore(OBJECT_STORE, {
            keyPath: OBJECT_STORE_ID,
            autoIncrement: OBJECT_STORE_AUTO_INCREMENT,
        });
        footageStore.createIndex(
            OBJECT_STORE_INDEX_NAME,
            OBJECT_STORE_ID,
            OBJECT_STORE_INDEX_OPTIONS
        );
    }
};

const openDB = () => {
    let db;
    const openPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => onUpgradeNeeded(event, db);

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Error opening DB", event.target.error);
      reject(event.target.error);
    };
  });
  return openPromise;
};

export const addFootage = async (footage) => {
    const db = await openDB();
    const addPromise = new Promise((resolve, reject) => {
        const transaction = db.transaction(OBJECT_STORE, OBJECT_STORE_OPERATION);
        const store = transaction.objectStore(OBJECT_STORE);
        const request = store.add(footage);

        request.onsuccess = () => resolve(request.result);
        request.onerror = (event) => reject(event.target.error); 
    });
    return addPromise;
};
