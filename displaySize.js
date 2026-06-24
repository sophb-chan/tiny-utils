function displaySize(bytes, type, space = true) {
    const types = {
        kilobyte: {
            start: 1e3,
            symbol: 'SB',
            scaleop: scale => 10 ** (3*scale)
        },
        kibibyte: {
            start: 1024,
            symbol: 'SiB',
            scaleop: scale => 1024 ** scale
        },
        kilobit: {
            start: 125,
            symbol: 'sb',
            scaleop: scale => 125 * (10**(3*scale))
        },
        kibibit: {
            start: 128,
            symbol: 'Sibit',
            scaleop: scale => 128 * (2**10)**scale
        } 
    }
    const scaleSymbols = Array.from('kkmgtpezy');
    
    const selectedType = types[type ?? 'kilobyte'];
    if (selectedType == null)
        throw new ReferenceError(`Unknown measurement type "${type}"`);

    if (bytes < selectedType.scaleop(1))
        return bytes + ['', ' '][space+0] + 'B';
    
    let fittingScale = 0;
    while (
        selectedType.scaleop(fittingScale) <= bytes
        ||
        scaleSymbols[fittingScale] == null
    ) {
        fittingScale++;
    }
    fittingScale--;
    const scaled = (bytes / selectedType.scaleop(fittingScale)).toFixed(3)
        .replaceAll('0', ' ')
        .trimEnd()
        .replaceAll(' ', '0')
        .replaceAll('.', ' ')
        .trimEnd()
        .replaceAll(' ', '.');

    const suffix = selectedType.symbol
                   .replaceAll('S', scaleSymbols[fittingScale].toUpperCase())
                   .replaceAll('s', scaleSymbols[fittingScale].toLowerCase());
    
    return scaled + ['', ' '][space+0] + suffix;
}
