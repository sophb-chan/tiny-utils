function parseKey(key) {
    const keyRegex = /([abcdefg])(s?)(-1|\d)/;
    const exec = keyRegex.exec(key);
    if (exec == null) throw new SyntaxError('Invalid key');

    return {
        key: exec[1],
        isSharp: exec[2] === 's',
        octave: parseInt(exec[3])
    };
}
