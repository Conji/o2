const fs = require('fs');

const VERSION = '0.0.1';
const AUTHOR = 'Conji';
const MessageType = {
    CHAT: 'Chat',
    GENERIC: 'Generic'
};

function convertStringToParamsArray(input) {
    let isReadingString = false;
    let result = [];
    let currentStep = '';
    let s = input.split(' ');
    for (let i = 0; i < s.length; ++i) {
        var value = s[i];
        if (!isReadingString) {
            if (value[0] === '"') {
                currentStep = value.substr(1);
                isReadingString = true;
            } else {
                result.push(normalizeValue(value));
            }
        } else {
            if (value.endsWith('"')) {
                currentStep += ` ${value.substr(0, value.length - 1)}`;
                result.push(currentStep);
                isReadingString = false;
            } else {
                currentStep += ` ${value}`;
            }
        }
    }
    return result;
}

function stringify(input, newLine = false) {
    if (Array.isArray(input)) return `[${input.map(stringify).join(`, ${newLine === true ? '\r\n' : ''}`)}]`;
    if (input.toString() === '[object Object]') {
        let result = '';
        for (let field in input) {
            result += `${field}: ${stringify(input[field])}, ${newLine === true ? '\r\n' : ''}`;
        }
        return `{${newLine === true ? '\r\n' : ''} ${result} ${newLine === true ? '\r\n' : ''}}`;
    }
    return input.toString();
}

function normalizeValue(value) {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(parseInt(value))) return parseInt(value);
    if (!isNaN(parseFloat(value))) return parseFloat(value);
    if (value[0] === '{' && value.endsWith('}')) return JSON.parse(value);
    return value;
}

function readdirdeep(dir) {
    let results = [];
    fs.readdirSync(dir).forEach((file) => {
        file = `${dir}/${file}`;
        let stat = fs.lstatSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(readdirdeep(file));
        } else {
            results.push(file);
        }
    });

    return results;
}

module.exports = {
    VERSION,
    AUTHOR,
    MessageType,
    convertStringToParamsArray,
    readdirdeep,
    stringify
}