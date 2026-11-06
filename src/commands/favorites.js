import { readData, saveData } from '../utils/storage.js';

// Add a city to favorites
async function addFavorite(city) {
    const data = await readData();

    const cityExists = data.favorites.some(
        favorite => favorite.toLowerCase() === city.toLowerCase()
    );

    if (cityExists) {
        return 'This city is already in your favorites.';
    }

    data.favorites.push(city);
    await saveData(data);

    return `${city} has been added to your favorites!`;
}

// Display all favorite cities
async function listFavorites() {
    const data = await readData();

    if (data.favorites.length === 0) {
        return 'You have no favorite cities yet.';
    }

    return data.favorites;
}

export { addFavorite, listFavorites };