import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

// Find the user's home directory
const DATA_DIRECTORY = path.join(os.homedir(), '.skycast');

// Define the JSON file location
const DATA_FILE = path.join(DATA_DIRECTORY, 'skycast-data.json');

// Default information for a new user
const DEFAULT_DATA = {
    favorites: [],
    history: [],
    settings: {
        units: 'metric'
    }
};

// Create the data file if it does not exist
async function ensureDataFile() {
    await mkdir(DATA_DIRECTORY, { recursive: true });

    try {
        await readFile(DATA_FILE, 'utf8');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }

        await writeFile(
            DATA_FILE,
            JSON.stringify(DEFAULT_DATA, null, 2),
            'utf8'
        );
    }
}

// Read saved information
async function readData() {
    await ensureDataFile();

    const content = await readFile(DATA_FILE, 'utf8');

    return JSON.parse(content);
}

// Save information
async function saveData(data) {
    await ensureDataFile();

    await writeFile(
        DATA_FILE,
        JSON.stringify(data, null, 2),
        'utf8'
    );
}

export { readData, saveData };