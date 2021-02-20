import PropTypes from 'prop-types';

import {useFieldProps} from '../../../app/web/components/form/form/use-field-props';
import {
    ATTACHMENT_MAX_SIZE,
    _ATTACHMENT_ALLOWED
} from '../fields';


export function AttachmentHelp({defaultData}) {
    const {checked} = useFieldProps({
        name: _ATTACHMENT_ALLOWED
    });
    const {value: attachmentLimit} = useFieldProps({
        name: ATTACHMENT_MAX_SIZE
    });

    if (!checked) {
        return (
            <>Нельзя отправлять файлы вложениями</>
        );
    }

    const maxSize = attachmentLimit !== '' ?
        attachmentLimit :
        defaultData[ATTACHMENT_MAX_SIZE];

    return (
        <>
            Файлы <b>от&nbsp;0&nbsp;до&nbsp;{maxSize}&nbsp;МБ</b> отправляются
            вложениями в&nbsp;письмо и&nbsp;занимают место в&nbsp;ящике
            пользователя
        </>
    );
}

AttachmentHelp.propTypes = {
    defaultData: PropTypes.object
};
