# SkyCast CLI 

**SkyCast CLI** is a command-line weather application built with Node.js. It allows users to retrieve current weather conditions and five-day weather forecasts for cities around the world directly from their terminal.

The application uses the **Open-Meteo Geocoding API** to find geographical coordinates for a city and the **Open-Meteo Weather API** to retrieve weather information.

In addition to weather updates, SkyCast CLI allows users to manage favorite cities, view recent search history, and customize temperature units.

---

## Features

- **Current Weather:** Retrieve current weather conditions, including temperature, feels-like temperature, humidity, wind speed, and weather description.
- **Five-Day Forecast:** View daily weather conditions with maximum and minimum temperatures for the next five days.
- **City Geocoding:** Search for cities by name and retrieve their geographical coordinates.
- **Favorite Cities:** Add, list, and remove favorite cities.
- **Search History:** View the ten most recent successful weather searches.
- **Temperature Settings:** Switch between metric (Celsius) and imperial (Fahrenheit) units.
- **Error Handling:** Display helpful error messages for invalid input, unavailable cities, network failures, timeouts, and API errors.
- **Persistent Data Storage:** Save favorite cities, search history, and settings in a local JSON file.

---

## Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime for building the CLI application |
| JavaScript (ES Modules) | Application logic and modular code organization |
| Node.js Fetch API | Making HTTP requests to weather services |
| Node.js `util.parseArgs` | Parsing command-line arguments |
| Node.js `fs/promises` | Reading and writing JSON data |
| Node.js `path` | Managing file paths |
| Node.js `os` | Accessing the user's home directory |
| Node.js `process` | Handling command-line execution and exit codes |
| Open-Meteo Geocoding API | Finding geographical coordinates for cities |
| Open-Meteo Weather API | Retrieving current weather and forecast data |
| Node.js Test Runner | Running automated tests |

---

## Prerequisites

Before installing SkyCast CLI, make sure you have:

- [Node.js](https://nodejs.org/) version 20 or later.
- npm (included with Node.js).
- Git installed on your computer.

No external API key is required because the application uses the Open-Meteo APIs.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/marquise-ange/SkyCast-CLI.git
```

### 2. Navigate to the project directory

```bash
cd SkyCast-CLI
```

### 3. Install project dependencies

```bash
npm install
```

### 4. Run SkyCast CLI

You can execute the application directly using Node.js:

```bash
node bin/skycast.js --help
```

### 5. Optional: Install the CLI command globally

To make the `skycast` command available from your terminal, run this inside the project directory:

```bash
npm link
```

You can then use:

```bash
skycast --help
```

---

## Complete Command Reference

The following table lists all available SkyCast CLI commands.

| Command | Description |
|---|---|
| `skycast --help` | Display the help menu |
| `skycast --version` | Display the application version |
| `skycast weather <city>` | Retrieve current weather for a city |
| `skycast forecast <city>` | Retrieve a five-day weather forecast |
| `skycast favorite add <city>` | Add a city to favorites |
| `skycast favorite list` | Display all favorite cities |
| `skycast favorite remove <city>` | Remove a city from favorites |
| `skycast history list` | Display recent weather searches |
| `skycast settings show` | Display current temperature settings |
| `skycast settings set <unit>` | Change temperature units |

**Supported temperature units:**

- `metric` — Celsius and km/h.
- `imperial` — Fahrenheit and mph.

**Note:** The `skycast` command requires the optional global installation using `npm link`. Without it, use `node bin/skycast.js` followed by the same arguments.

---

## Usage Examples

### 1. Display Help

```bash
skycast --help
```

### 2. Display Version

```bash
skycast --version
```

### 3. Get Current Weather

```bash
skycast weather Kigali
```

Another example:

```bash
skycast weather Nairobi
```

The result includes:

- Weather conditions.
- Current temperature.
- Feels-like temperature.
- Relative humidity.
- Wind speed.
- Local time and day/night period.

### 4. Get a Five-Day Forecast

```bash
skycast forecast Kigali
```

The forecast includes daily weather descriptions, maximum temperatures, and minimum temperatures.

### 5. Manage Favorite Cities

Add a city:

```bash
skycast favorite add Kigali
```

List favorite cities:

```bash
skycast favorite list
```

Remove a city:

```bash
skycast favorite remove Kigali
```

### 6. View Search History

```bash
skycast history list
```

SkyCast keeps the ten most recent successful searches.

### 7. Manage Temperature Settings

Display current settings:

```bash
skycast settings show
```

Use Celsius and metric wind speed:

```bash
skycast settings set metric
```

Use Fahrenheit and imperial wind speed:

```bash
skycast settings set imperial
```

---

## Configuration

SkyCast CLI supports an environment variable for configuring the request timeout.

| Variable | Description | Default |
|---|---|---|
| `SKYCAST_TIMEOUT_MS` | Maximum time allowed for an API request, in milliseconds | `10000` |

The default timeout is 10 seconds.

To change the timeout in Git Bash:

```bash
SKYCAST_TIMEOUT_MS=5000 node bin/skycast.js weather Kigali
```

To change it in Windows PowerShell:

```powershell
$env:SKYCAST_TIMEOUT_MS="5000"
node bin/skycast.js weather Kigali
```

This example sets the request timeout to five seconds.

If the supplied timeout is invalid or less than or equal to zero, SkyCast uses the default value of 10 seconds.

---

## Data Storage

SkyCast CLI uses JSON file storage to preserve user information between application runs.

The application automatically creates a `.skycast` directory in the user's home directory and stores information in:

```text
~/.skycast/skycast-data.json
```

On Windows, this is typically:

```text
C:\Users\YourUsername\.skycast\skycast-data.json
```

The JSON file stores:

- Favorite cities.
- Recent search history.
- Temperature settings.

The application uses Node.js `fs/promises` to read and write this information asynchronously.

---

## Running Tests

SkyCast CLI uses the built-in Node.js test runner.

To execute the automated tests, run:

```bash
npm test
```

The tests cover:

- Weather condition descriptions.
- Current weather formatting.
- Five-day forecast formatting.
- City name validation.
- Temperature unit validation.

The test command displays the number of passing and failing tests.

---

## Error Handling

SkyCast CLI provides user-friendly error messages for common problems, including:

- Missing city names.
- Invalid city names.
- Cities that cannot be found.
- Network connection failures.
- API request timeouts.
- Unsuccessful API responses.
- Invalid API response data.

The application also uses a non-zero process exit code when a command fails, allowing other command-line tools and scripts to detect errors.

---

## API Sources

SkyCast CLI uses the following free weather services from Open-Meteo:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — searches for locations and returns geographical coordinates.
- [Open-Meteo Weather API](https://open-meteo.com/en/docs) — provides current weather conditions and daily forecasts.

---

## Project Structure

```text
SkyCast-CLI/
│
├── bin/
│   └── skycast.js
│
├── data/
│
├── src/
│   ├── commands/
│   │   ├── favorites.js
│   │   ├── forecast.js
│   │   ├── history.js
│   │   ├── settings.js
│   │   └── weather.js
│   │
│   ├── services/
│   │   ├── geocoding.js
│   │   └── weather.js
│   │
│   ├── utils/
│   │   ├── formatter.js
│   │   └── storage.js
│   │
│   ├── config.js
│   └── index.js
│
├── tests/
│   └── formatter.test.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## License

This project is licensed under the MIT License.

---

**Built with Node.js and Open-Meteo.** 