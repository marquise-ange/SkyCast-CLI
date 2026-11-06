
import { parseArgs } from 'node:util';

function startSkyCast() {
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
  weather <city>     Get current weather
  forecast <city>    Get weather forecast

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

    // Handle unknown commands
    console.log(`Error: Unknown command "${command}".`);
    console.log('Use --help to see available commands.');
    process.exitCode = 1;
}

export { startSkyCast };
