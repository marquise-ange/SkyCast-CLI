
import { parseArgs } from 'node:util';
import { addFavorite, listFavorites, removeFavorite } from './commands/favorites.js';
import { addHistory, listHistory } from './commands/history.js';
import { getSettings, setUnits } from './commands/settings.js';

async function startSkyCast() {
    const { values, positionals } = parseArgs({
        args: process.argv.slice(2),
        options: {
            help: {
                type: 'boolean',
                short: 'h'
            },
            version: {
                type: 'boolean',
                short: 'v'
            }
        },
        allowPositionals: true
    });

    // Display application help
    if (values.help) {
        console.log(`
=================================
          SKYCAST CLI
=================================

Weather Intelligence From Your Terminal

USAGE:
  skycast [command] [city]


 COMMANDS:
  weather <city>          Get current weather
  forecast <city>         Get weather forecast
  favorite add <city>     Save a favorite city
  favorite list           List favorite cities
  favorite remove <city>  Remove a favorite city
  history list           View recent searches
  settings show          Display current settings
  settings set <unit>    Change temperature unit

OPTIONS:
  -h, --help         Show help
  -v, --version      Show version

EXAMPLES:
  skycast weather Kigali
  skycast forecast Nairobi
        `);
        return;
    }

    // Display application version
    if (values.version) {
        console.log('SkyCast CLI v1.0.0');
        return;
    }

    const command = positionals[0];
    const city = positionals[1];

    // Default welcome message
    if (!command) {
        console.log('Welcome to SkyCast CLI!');
        console.log('Use --help to see available commands.');
        return;
    }

    // Handle weather command
    if (command === 'weather') {
        if (!city) {
            console.log('Error: Please provide a city name.');
            process.exitCode = 1;
            return;
        }

        console.log(`Weather requested for: ${city}`);
        return;
    }

    // Handle forecast command
    if (command === 'forecast') {
        if (!city) {
            console.log('Error: Please provide a city name.');
            process.exitCode = 1;
            return;
        }

        console.log(`Forecast requested for: ${city}`);
        return;
    }

    // Handle favorite commands
    if (command === 'favorite') {
        const action = positionals[1];
        const favoriteCity = positionals[2];

        if (action === 'add') {
            if (!favoriteCity) {
                console.log('Error: Please provide a city name.');
                process.exitCode = 1;
                return;
            }

            console.log(await addFavorite(favoriteCity));
            return;
        }

        if (action === 'list') {
            const favorites = await listFavorites();

            if (typeof favorites === 'string') {
                console.log(favorites);
            } else {
                console.log('Your favorite cities:');

                favorites.forEach((city, index) => {
                    console.log(`${index + 1}. ${city}`);
                });
            }

            return;
        }
        if (action === 'remove') {
            if (!favoriteCity) {
                console.log('Error: Please provide a city name.');
                process.exitCode = 1;
                return;
            }

            console.log(await removeFavorite(favoriteCity));
            return;
        }

        console.log('Unknown favorite command. Use add or list.');
        process.exitCode = 1;
        return;
    }

    // Handle history commands
    if (command === 'history') {
        const action = positionals[1];

        if (action === 'list') {
            const history = await listHistory();

            if (typeof history === 'string') {
                console.log(history);
            } else {
                console.log('Your recent searches:');

                history.forEach((city, index) => {
                    console.log(`${index + 1}. ${city}`);
                });
            }

            return;
        }

        console.log('Unknown history command. Use list.');
        process.exitCode = 1;
        return;
    }

    // Handle settings commands
    if (command === 'settings') {
        const action = positionals[1];

        if (action === 'show') {
            const settings = await getSettings();

            console.log('Your SkyCast settings:');
            console.log(`Temperature unit: ${settings.units}`);
            return;
        }

        if (action === 'set') {
            const unit = positionals[2];

            if (!unit) {
                console.log('Error: Please provide metric or imperial.');
                process.exitCode = 1;
                return;
            }

            const message = await setUnits(unit);
            console.log(message);

            if (!['metric', 'imperial'].includes(unit.toLowerCase())) {
                process.exitCode = 1;
            }

            return;
        }

        console.log('Unknown settings command. Use show or set.');
        process.exitCode = 1;
        return;
    }

    // Handle unknown commands
    console.log(`Error: Unknown command "${command}".`);
    console.log('Use --help to see available commands.');
    process.exitCode = 1;
}

export { startSkyCast };
