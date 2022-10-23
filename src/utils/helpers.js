// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

// Translate seconds to HH:MM:SS
const translateFromSeconds = seconds => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
};

// Translate HH:MM:SS to seconds
const translateToSeconds = (hours, minutes, seconds) => {
    return ((hours * 60) * 60) + (minutes * 60) + seconds;
};

export { translateFromSeconds, translateToSeconds };