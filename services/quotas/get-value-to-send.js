import {MAILBOX_USAGE, numericFields} from './fields';

export function getValueToSend(value, key) {
    if (key === MAILBOX_USAGE) {
        return;
    }

    if (!numericFields.includes(key)) {
        return value;
    }

    return typeof value === 'string' && value !== '' ?
        Number(value) :
        null;
}
