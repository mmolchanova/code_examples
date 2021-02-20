import {isDisabled} from '../../../app/web/components/form/form/utilities/is-disabled';
import {updateOrCreateEntityItem} from '../../../app/web/components/state-manange/utilities/update-or-create-entity-item';
import {
    ATTACHMENT_MAX_SIZE,
    LINK_MAX_SIZE,
    MAILBOX_SIZE,
    MAILBOX_WARNING_SIZE,
    _ATTACHMENT_ALLOWED,
    _LINK_ALLOWED
} from '../fields';


export function mapDataValue(value, fieldId, fields) {
    let nextFields = updateOrCreateEntityItem(fields, fieldId, value);

    nextFields = updateOrCreateEntityItem(nextFields, MAILBOX_SIZE, {
        value: nextFields.byId[MAILBOX_SIZE]?.value?.replace(/[^\d]/g, '')
    });

    nextFields = updateOrCreateEntityItem(nextFields, MAILBOX_WARNING_SIZE, {
        value:
            nextFields.byId[MAILBOX_WARNING_SIZE]?.value?.replace(/[^\d]/g, '')
    });

    nextFields = updateOrCreateEntityItem(nextFields, ATTACHMENT_MAX_SIZE, {
        value:
            nextFields.byId[ATTACHMENT_MAX_SIZE]?.value?.replace(/[^\d]/g, ''),
        disabled: isDisabled(fields, ATTACHMENT_MAX_SIZE) ||
            !nextFields.byId[_ATTACHMENT_ALLOWED]?.checked
    });

    nextFields = updateOrCreateEntityItem(nextFields, LINK_MAX_SIZE, {
        value: nextFields.byId[LINK_MAX_SIZE]?.value?.replace(/[^\d]/g, ''),
        disabled: isDisabled(fields, LINK_MAX_SIZE) ||
            !nextFields.byId[_LINK_ALLOWED]?.checked
    });

    return nextFields;
}
