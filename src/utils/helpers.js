// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

// Turn seconds to HH:MM:SS:MS
const translateFromSeconds = seconds => {
    return new Date(seconds * 1000).toISOString().slice(11, 19);
};

export {translateFromSeconds};