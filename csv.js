module.exports.parse = (string) => {
    let result = [];

    let lines = string.split('\n');

    for (let line of lines) {
        let parts = line.split(',');
        let resultLine = [];

        let i = 0;
        while (i < parts.length) {
            let currentValue = parts[i];
            if (parts[i].slice(0, 1) == '"' && (parts[i].slice(-1) != '"' || parts[i].slice(-2) == '""')) {
                i += 1;
                while (i < parts.length && (parts[i].slice(-1) != '"' || parts[i].slice(-2) == '""')) {
                    currentValue += ',';
                    currentValue += parts[i];
                    i += 1;
                }

                currentValue += ',';
                currentValue += parts[i];
            }

            currentValue = currentValue.replace(/"(?!")/g, '');

            resultLine.push(currentValue);

            i += 1;
        }

        result.push(resultLine);
    }

    return result;
};

module.exports.stringify = (twoDArray, columnTypes) => {
    return twoDArray
        .map((row) =>
            row
                .map((data, i) => {
                    let readyString = `${data}`;

                    if (readyString.indexOf(',') != -1 || readyString.indexOf('"') != -1) {
                        readyString = readyString.replace(/"/g, '""');
                        readyString = `"${readyString}"`;
                    }

                    if (columnTypes && columnTypes[i]) {
                        if (columnTypes[i] == 'string') {
                            if (readyString.charAt(0) != '"') readyString = `"${readyString}"`;
                        }
                    }

                    return readyString;
                })
                .join(',')
        )
        .join('\n');
};
