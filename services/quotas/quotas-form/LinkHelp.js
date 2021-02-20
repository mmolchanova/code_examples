import PropTypes from 'prop-types';

import {useFieldProps} from '../../../app/web/components/form/form/use-field-props';
import {
    ATTACHMENT_MAX_SIZE,
    LINK_MAX_SIZE,
    _ATTACHMENT_ALLOWED,
    _LINK_ALLOWED
} from '../fields';


export function LinkHelp({defaultData}) {
    const {checked} = useFieldProps({
        name: _LINK_ALLOWED
    });
    const {value: linkLimit} = useFieldProps({
        name: LINK_MAX_SIZE
    });
    const {checked: attachmentAllowed} = useFieldProps({
        name: _ATTACHMENT_ALLOWED
    });
    const {value: attachmentLimit} = useFieldProps({
        name: ATTACHMENT_MAX_SIZE
    });

    if (!checked) {
        return (
            <>
                Из&nbsp;письма нельзя загружать файлы
                в&nbsp;хранилище с&nbsp;отправкой ссылки
            </>
        );
    }

    let minSize = defaultData[ATTACHMENT_MAX_SIZE];
    if (attachmentLimit !== '' && !isNaN(Number(attachmentLimit))) {
        minSize = Number(attachmentLimit) + 0.01;
    }
    if (!attachmentAllowed) {
        minSize = 0;
    }

    const maxSize = linkLimit !== ''  ?
        linkLimit :
        defaultData[LINK_MAX_SIZE];

    return (
        <>
            Файлы <b>
            от&nbsp;{minSize}&nbsp;до&nbsp;{maxSize}&nbsp;МБ
            </b> загружаются
            в&nbsp;файловое хранилище и&nbsp;отправляются ссылками
        </>
    );
}

LinkHelp.propTypes = {
    defaultData: PropTypes.object
};
