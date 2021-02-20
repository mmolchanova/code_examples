export const FORM_ID = 'mail-quotas-settings';

export function getFieldId(fieldName) {
    return `${FORM_ID}-${fieldName}`;
}

export const MAILBOX_SIZE = 'mailbox_size';
export const MAILBOX_USAGE = 'mailbox_usage';
export const MAILBOX_WARNING_SIZE = 'mailbox_warning_size';
export const ATTACHMENT_FORBIDDEN = 'attachment_forbidden';
export const LINK_FORBIDDEN = 'link_forbidden';
export const ATTACHMENT_MAX_SIZE = 'attachment_max_size';
export const LINK_MAX_SIZE = 'link_max_size';

export const _ATTACHMENT_ALLOWED = '_attachment_allowed';
export const _LINK_ALLOWED = '_link_allowed';

export const SUBMIT = 'submit';
export const DEFAULT_VALUES = 'default_values';

export const numericFields = [
    MAILBOX_SIZE,
    MAILBOX_WARNING_SIZE,
    ATTACHMENT_MAX_SIZE,
    LINK_MAX_SIZE
];
