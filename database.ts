export class DataBase {
    private readonly dbName: string;
    private readonly dbVersion: number;
    private readonly storeName: string = "Cards";

    constructor(pluginName: string, version: number) {
        this.dbName = `${pluginName}_DB`; // Each plugin gets its own database
        this.dbVersion = version;
    }

    // Open the database and ensure schema is up-to-date
    public openDataBase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;

                // Create the object store if it doesn't exist
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };

            request.onsuccess = (event) => {
                resolve((event.target as IDBOpenDBRequest).result);
            };

            request.onerror = (event) => {
                reject((event.target as IDBOpenDBRequest).error);
            };
        });
    }

    // Insert or update data in the object store
    public async putData<T>(key: string, value: T): Promise<boolean> {
        const db = await this.openDataBase();

        return new Promise((resolve) => {
            const transaction = db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);

            const request = store.put(value, key);

            request.onsuccess = () => resolve(true);  // Return true if success
            request.onerror = () => resolve(false);  // Return false if error
        });
    }

    // Retrieve data by key
    public async getData<T>(key: string): Promise<T | undefined> {
        const db = await this.openDataBase();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, "readonly");
            const store = transaction.objectStore(this.storeName);

            const request = store.get(key);

            request.onsuccess = () => resolve(request.result as T | undefined);
            request.onerror = (event) => reject((event.target as IDBRequest).error);
        });
    }

    // Delete data by key
    public async deleteData(key: string): Promise<boolean> {
        const db = await this.openDataBase();

        return new Promise((resolve) => {
            const transaction = db.transaction(this.storeName, "readwrite");
            const store = transaction.objectStore(this.storeName);

            const request = store.delete(key);

            request.onsuccess = () => resolve(true);  // Return true if success
            request.onerror = () => resolve(false);  // Return false if error
        });
    }
}

