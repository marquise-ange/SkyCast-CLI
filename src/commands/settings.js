import { readData, saveData } from '../utils/storage.js';

// Display current settings
async function getSettings() {
    const data = await readData();

    return data.settings;
}

// Update temperature units
async function setUnits(unit) {
    const normalizedUnit = unit.toLowerCase();

    if (!['metric', 'imperial'].includes(normalizedUnit)) {
        return 'Invalid unit. Choose metric or imperial.';
    }

    const data = await readData();

    data.settings.units = normalizedUnit;

    await saveData(data);

    return `Temperature unit updated to ${normalizedUnit}.`;
}

export { getSettings, setUnits };