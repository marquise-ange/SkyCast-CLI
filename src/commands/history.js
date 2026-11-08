import { readData, saveData } from '../utils/storage.js';

// Save a city in search history
async function addHistory(city) {
    const data = await readData();

    data.history.unshift(city);

    // Keep only the 10 most recent searches
    data.history = data.history.slice(0, 10);

    await saveData(data);

    return `${city} has been saved to search history.`;
}

// Display search history
async function listHistory() {
    const data = await readData();

    if (data.history.length === 0) {
        return 'Your search history is empty.';
    }

    return data.history;
}

export { addHistory, listHistory };
