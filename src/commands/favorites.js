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



// Remove a city from favorites
async function removeFavorite(city) {
    const data = await readData();

    const cityIndex = data.favorites.findIndex(
        favorite => favorite.toLowerCase() === city.toLowerCase()
    );

    if (cityIndex === -1) {
        return 'This city is not in your favorites.';
    }

    const removedCity = data.favorites.splice(cityIndex, 1)[0];

    await saveData(data);

    return `${removedCity} has been removed from your favorites.`;
}

export { addFavorite, listFavorites, removeFavorite };