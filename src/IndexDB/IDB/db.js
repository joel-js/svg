import { openDB } from "idb";

const getDatabaseVersion = async () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME); // Open without specifying a version

    request.onsuccess = (event) => {
      const db = event.target.result;
      const version = db.version; // Get stored version
      db.close(); // Close connection
      resolve(version);
    };

    request.onerror = () => reject("Error retrieving database version.");
  });
};


const DB_NAME = "siteSentryOutageDB";
let DB_SCHEMA_VERSION = 1;

getDatabaseVersion().then((version) => {
  DB_SCHEMA_VERSION = version || 1; // Use stored version or default to 1
  console.log(`Using DB Version: ${DB_SCHEMA_VERSION}`);

  // Now you can safely open the database with this version
  openDB(DB_NAME, DB_SCHEMA_VERSION);
}).catch((error) => {
  console.error(error);
});

const OUTAGE_STORE = "outages";
const OUTAGE_STORE_KEY_PATH = "id";
const KEY_PATH_CAMID = "camID";
const KEY_PATH_START_TIME = "startTime";
const KEY_PATH_END_TIME = "endTime";
const OUTAGE_STORE_AUTO_INCREMENT = true;

const INDEXES = {
  CAM_ID_START_TIME: {
    INDEX: `${KEY_PATH_CAMID}_${KEY_PATH_START_TIME}`,
    OPTIONS: { unique: false },
  },
  START_TIME: {
    INDEX: KEY_PATH_START_TIME,
    OPTIONS: { unique: false },
  },
  END_TIME: {
    INDEX: KEY_PATH_END_TIME,
    OPTIONS: { unique: false },
  },
};

const TX_MODE = {
  READ_WRITE: "readwrite",
  READ: "readonly",
};

const objectStoreOptions = {
  keyPath: OUTAGE_STORE_KEY_PATH,
  autoIncrement: OUTAGE_STORE_AUTO_INCREMENT,
};

const dbUpgrade = (db) => {
  if (!db.objectStoreNames.contains(OUTAGE_STORE)) {
    const store = db.createObjectStore(OUTAGE_STORE, objectStoreOptions);

    // create Indexes
    store.createIndex(
      INDEXES.START_TIME.INDEX,
      KEY_PATH_START_TIME,
      INDEXES.START_TIME.OPTIONS
    );
    store.createIndex(
      INDEXES.END_TIME.INDEX,
      KEY_PATH_END_TIME,
      INDEXES.END_TIME.OPTIONS
    );
    store.createIndex(
      INDEXES.CAM_ID_START_TIME.INDEX,
      [KEY_PATH_CAMID, KEY_PATH_START_TIME],
      INDEXES.CAM_ID_START_TIME.OPTIONS
    );
  }
};

const callbacks = {
  upgrade: dbUpgrade,
};

const dbPromise = openDB(DB_NAME, DB_SCHEMA_VERSION, callbacks);

// for future outage validations
export const outage = (camID, startTime, endTime) => ({
  camID,
  startTime,
  endTime,
});

export const addOutage = async (outage) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(OUTAGE_STORE, TX_MODE.READ_WRITE);
    const store = tx.objectStore(OUTAGE_STORE);
    await store.put(outage);
    await tx.complete;
    // alert("Outage added successfully!");
  } catch (error) {
    console.log("Error adding outage:", error);
  }
};

export const getOutage = async (camID) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(OUTAGE_STORE, TX_MODE.READ);
    const store = tx.objectStore(OUTAGE_STORE);
    const outage = await store.get(camID);
    await tx.complete;
    console.log("Outage data retrieved:", outage);
    return outage;
  } catch (error) {
    console.error("Error retrieving outage data:", error);
    return {};
  }
};

export const getCamOutages = async (camID, startTime, endTime) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(OUTAGE_STORE, TX_MODE.READ);
    const store = tx.objectStore(OUTAGE_STORE);
    const index = store.index(INDEXES.CAM_ID_START_TIME.INDEX);

    const range = IDBKeyRange.bound([camID, startTime], [camID, endTime]);

    const outages = await index.getAll(range);
    // Further filtering to ensure the end time falls within the range
    const filteredOutages = outages.filter(
      (outage) => outage.endTime >= startTime && outage.startTime <= endTime
    );

    return filteredOutages;
  } catch (error) {
    console.log("Error retrieving outages:", error);
    return [];
  }
};

export const clearObjectStore = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(OUTAGE_STORE, TX_MODE.READ_WRITE);
    await tx.objectStore(OUTAGE_STORE).clear();
    console.log(`All records in "${OUTAGE_STORE}" deleted.`);
  } catch (error) {
    console.error("Error clearing object store:", error);
  }
};

