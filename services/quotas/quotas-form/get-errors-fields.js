import {
    ATTACHMENT_MAX_SIZE,
    LINK_MAX_SIZE,
    _ATTACHMENT_ALLOWED,
    _LINK_ALLOWED
} from '../fields';


export function getErrorsFields(fieldId) {
    let fields = [fieldId];

    if (fieldId === _LINK_ALLOWED || fieldId === LINK_MAX_SIZE) {
        fields = [LINK_MAX_SIZE];
    }

    if (fieldId === _ATTACHMENT_ALLOWED || fieldId === ATTACHMENT_MAX_SIZE) {
        fields = [ATTACHMENT_MAX_SIZE, LINK_MAX_SIZE];
    }

    return fields;
}
