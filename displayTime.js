function displayTime(ms) {
    if (ms < 1e3) {
        return `${ms}ms`;
    } else if (ms < 60e3) {
        return `${Math.trunc(ms / 1e3)}s`
    } else if (ms < 3.6e6) {
        return `${Math.trunc(ms / 60e3)}m`
    } else if (ms < 8.64e7) {
        return `${Math.trunc(ms / (60e3 * 60))}h`
    } else if (ms < 6.048e8) {
        return `${(ms / 8.64e7).toFixed(2)}d`
    } else {
        return `${(ms / (60e3 * 60 * 24 * 7)).toFixed(2)}w`
    }
}
