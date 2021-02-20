import PropTypes from 'prop-types';
import {useCallback} from 'react';

import {Dialog} from '../../../app/web/components/dialog/Dialog';
import {dialogControl} from '../../../app/web/components/dialog/dialog-control-hoc';
import {Button} from '../../../app/web/components/form/button/Button';
import {QUOTAS_DIALOG_ID} from '../const';


const DialogButton = dialogControl(Button);

export function QuotasConfirmDialog({
    open,
    data,
    isUserQuotas,
    onClose,
    onPositiveClick
}) {
    const text = isUserQuotas ?
        <b>пользователь может</b> :
        <>некоторые <b>пользователи могут</b></>;

    const _onPositiveClick = useCallback(function() {
        onPositiveClick(data);
    }, [data, onPositiveClick]);

    return (
        <Dialog
            onClose={onClose}
            open={open}
            id={QUOTAS_DIALOG_ID}
            aria-labelledby={`${QUOTAS_DIALOG_ID}-title`}
        >
            <Dialog.Header id={QUOTAS_DIALOG_ID} onCloseButtonClick={onClose}>
                Подтверждение изменений
            </Dialog.Header>
            <Dialog.Body>
                При уменьшении размера ящика или объема ящика, при котором
                запрещено отправлять письма, {text}{' '}
                <b>потерять возможность получать и&nbsp;отправлять письма</b>.
                Вы&nbsp;уверены, что хотите это сделать?
            </Dialog.Body>

            <Dialog.Footer noSeparator>
                <DialogButton
                    style='primary'
                    onClick={_onPositiveClick}
                >
                    Подтвердить
                </DialogButton>
                <DialogButton
                    onClick={onClose}
                >
                    Отменить
                </DialogButton>
            </Dialog.Footer>
        </Dialog>
    );
}

QuotasConfirmDialog.defaultProp = {
    isUserQuotas: false
};

QuotasConfirmDialog.propTypes = {
    open: PropTypes.bool,
    data: PropTypes.object,
    isUserQuotas: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onPositiveClick: PropTypes.func.isRequired
};
