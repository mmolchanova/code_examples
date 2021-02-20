import {numericFields} from './fields';

export function getValueToJSON(value, key) {
    if (!numericFields.includes(key)) {
        return value;
    }

    return typeof value === 'number' ?
        String(value) :
        value;
}
