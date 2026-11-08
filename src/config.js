// Read the request timeout from the environment
const timeoutValue = Number(
    process.env.SKYCAST_TIMEOUT_MS ?? 10000
);

// Use the provided timeout if valid, otherwise use 10 seconds
const REQUEST_TIMEOUT_MS =
    Number.isFinite(timeoutValue) && timeoutValue > 0
        ? timeoutValue
        : 10000;

export { REQUEST_TIMEOUT_MS };