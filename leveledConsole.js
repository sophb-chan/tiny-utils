class LeveledConsole {
    shouldLog(messageLevel) {
        if (this.loggingLevel < 0)
            return targetLevel === messageLevel;
        else 
            return targetLevel >= messageLevel;
    }

    constructor (loggingLevel) {
        if (typeof loggingLevel !== 'number')
            throw new TypeError('Logging level must be a number.');

        this.loggingLevel = loggingLevel;
        
        const consoleFunctions = Object.entries(console).filter(v => typeof v[1] === 'function');
        for (const [functionName, consoleFunction] of consoleFunctions) {
            this[functionName] = function (messageLevel, ...args) {
                if (this.shouldLog(messageLevel))
                    consoleFunction(...args);
                else return null;
            }
        }
    }
    levelName(loggingLevel) {
        if (typeof loggingLevel !== 'number')
            throw new TypeError('Logging level must be a number.');

        if (this.#levelNames == null) return null; 
        return this.#levelNames[loggingLevel];
    }
    setLevelName(loggingLevel, name) {
        if (typeof loggingLevel !== 'number')
            throw new TypeError('Logging level must be a number.');

        this.#levelNames ??= {};
        return this.#levelNames[loggingLevel] = name;
    }
}
