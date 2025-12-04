
// Simple localStorage wrapper with default values
// In the future, replace these with API calls to your backend/S3

export const storage = {
    getItem: (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading ${key} from localStorage`, error);
            return defaultValue;
        }
    },

    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing ${key} to localStorage`, error);
        }
    },

    removeItem: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key} from localStorage`, error);
        }
    },

    // Stub for future migration
    migrateToServer: async () => {
        console.log('Migration to server not implemented yet.');
        // 1. Read all keys
        // 2. POST to /api/sync
    }
};
