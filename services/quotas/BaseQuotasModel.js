import {set as setDomainId} from '../../app/web/utilities/set-domain-id';
import {errors} from '../../api';
import Backbone from '../../components/app/backbone-wrap';
import {mapValues} from '../../utilities';

import {
    ATTACHMENT_MAX_SIZE_LIMIT,
    LINK_MAX_SIZE_LIMIT,
    MAILBOX_SIZE_LIMIT,
    MAILBOX_WARNING_SIZE_LIMIT
} from './const';
import {
    ATTACHMENT_FORBIDDEN,
    ATTACHMENT_MAX_SIZE,
    LINK_FORBIDDEN,
    LINK_MAX_SIZE,
    MAILBOX_SIZE,
    MAILBOX_WARNING_SIZE
} from './fields';
import {getValueToJSON} from './get-value-to-json';


export class BaseQuotasModel extends Backbone.Model {
    preinitialize(attributes, options = {}) {
        setDomainId('BaseQuotasModel', this, options.domainId);
    }

    initialize() {
        errors.mixin.setErrorsConverter.call(this);
    }

    validate(attributes) {
        const errors = [];

        const isAttachmentForbidden = Boolean(attributes[ATTACHMENT_FORBIDDEN]);
        const isLinkForbidden = Boolean(attributes[LINK_FORBIDDEN]);

        if (attributes[MAILBOX_SIZE] && (
            attributes[MAILBOX_SIZE] > MAILBOX_SIZE_LIMIT
        )) {
            errors.push({
                field: MAILBOX_SIZE,
                message: [
                    `Размер ящика не может превышать ${MAILBOX_SIZE_LIMIT} МБ`
                ]
            });
        }

        if (attributes[MAILBOX_WARNING_SIZE] && (
            attributes[MAILBOX_WARNING_SIZE] < 0 ||
            attributes[MAILBOX_WARNING_SIZE] > MAILBOX_WARNING_SIZE_LIMIT
        )) {
            errors.push({
                field: MAILBOX_WARNING_SIZE,
                message: [
                    `Введите значение от 0 до ${MAILBOX_WARNING_SIZE_LIMIT}`
                ]
            });
        }

        if (!isAttachmentForbidden && (attributes[ATTACHMENT_MAX_SIZE] < 0)) {
            errors.push({
                field: ATTACHMENT_MAX_SIZE,
                message: ['Значение не может быть отрицательным']
            });
        }

        if (!isAttachmentForbidden && (
            attributes[ATTACHMENT_MAX_SIZE] > ATTACHMENT_MAX_SIZE_LIMIT
        )) {
            errors.push({
                field: ATTACHMENT_MAX_SIZE,
                message: ['Максимальный размер вложений ' +
                    `не может превышать ${ATTACHMENT_MAX_SIZE_LIMIT} МБ`]
            });
        }

        if (!isLinkForbidden && (
            attributes[LINK_MAX_SIZE] > LINK_MAX_SIZE_LIMIT
        )) {
            errors.push({
                field: LINK_MAX_SIZE,
                message: ['Размер отправляемых ссылками файлов ' +
                `не может быть больше ${LINK_MAX_SIZE_LIMIT} МБ`]
            });
        }

        if (!isLinkForbidden && isAttachmentForbidden && (
            attributes[LINK_MAX_SIZE] < 0
        )) {
            errors.push({
                field: LINK_MAX_SIZE,
                message: ['Значение не может быть отрицательным']
            });
        }

        if (!isLinkForbidden && !isAttachmentForbidden && (
            attributes[LINK_MAX_SIZE] < attributes[ATTACHMENT_MAX_SIZE]
        )) {
            errors.push({
                field: LINK_MAX_SIZE,
                message: ['Размер отправляемых ссылками файлов ' +
                'не может быть меньше вложениий']
            });
        }

        return errors.length ? errors : null;
    }

    toJSON(options = {}) {
        const JSON = super.toJSON(options);

        if (options.validate === true) {
            return JSON;
        }

        const mappedData = mapValues(JSON, getValueToJSON);

        return mappedData;
    }
}
